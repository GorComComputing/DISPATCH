'use strict';


// Wasm компонент
class Wasm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  componentWillMount() {				
/*			// This is a polyfill for FireFox and Safari
            if (!WebAssembly.instantiateStreaming) { 
                WebAssembly.instantiateStreaming = async (resp, importObject) => {
                    const source = await (await resp).arrayBuffer()
                    return await WebAssembly.instantiate(source, importObject)
                }
            }

            // Promise to load the wasm file
           function loadWasm(path) {
             const go = new Go()

             return new Promise((resolve, reject) => {
               WebAssembly.instantiateStreaming(fetch(path), go.importObject)
               .then(result => {
                 go.run(result.instance)
                 resolve(result.instance)
               })
               .catch(error => {
                 reject(error)
               })
             })
           }

         // Load the wasm file
         loadWasm("main.wasm").then(wasm => {  
             console.log("main.wasm is loaded 👋")
         }).catch(error => {
             console.log("ouch", error)
         })  
         
  */       
  
  const go = new Go();

  const runWasm = async () => {
  const importObject = go.importObject;
  const wasmModule = await wasmBrowserInstantiate("GUI.wasm", importObject);
  go.run(wasmModule.instance);

  // Get our exports object, with all of our exported Wasm Properties
  const exports = wasmModule.instance.exports;

  // Get our memory object from the exports
  const memory = exports.memory;

  // Create a Uint8Array to give us access to Wasm Memory
  const wasmByteMemoryArray = new Uint8Array(memory.buffer);

  // Get the pointer (index) to where our graphics buffer is located in wasm linear memory
  const graphicsBufferPointer = exports.getGraphicsBufferPointer();
  const graphicsBufferSize = exports.getGraphicsBufferSize();

  const canvasElement = document.querySelector("canvas");
  const canvasContext = canvasElement.getContext("2d");
  const canvasImageData = canvasContext.createImageData(canvasElement.width, canvasElement.height);
  
  canvasElement.onclick = function() {
  		exports.eventClick(event.offsetX, event.offsetY);
	}
	
  canvasElement.onmousedown = function() {
  		exports.eventMouseDown(event.offsetX, event.offsetY);
	}
	
  canvasElement.onmouseup = function() {
  		exports.eventMouseUp(event.offsetX, event.offsetY);
	}
	
  canvasElement.onmousemove = function() {
  		exports.eventMouseMove(event.offsetX, event.offsetY);
	}

  // Clear the canvas
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

  const drawCheckerBoard = () => {
    //const checkerBoardSize = 20;

    // Generate a new checkboard in wasm
    exports.Draw();

    // Pull out the RGBA values from Wasm memory, the we wrote to in wasm,
    // starting at the checkerboard pointer (memory array index)
    const imageDataArray = wasmByteMemoryArray.slice(graphicsBufferPointer, graphicsBufferPointer + graphicsBufferSize);
    canvasImageData.data.set(imageDataArray);

    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasContext.putImageData(canvasImageData, 0, 0);
  };
  
   const keyDown = (e) => {
   	console.log(e.key);
   	exports.keyDown(e.keyCode);
   }

  //drawCheckerBoard();
  setInterval(() => {
    drawCheckerBoard();
  }, 150); // 25
  
  addEventListener("keydown", keyDown);
};
runWasm();   
	}
  

  render() {
        return (
        	<div id="body_wasm">
        		<canvas id="cnvs" width="1920" height="1080"></canvas>
        	</div>
        );

  }
}

