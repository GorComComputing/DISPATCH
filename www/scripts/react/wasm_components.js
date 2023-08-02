'use strict';


// Wasm компонент
class Wasm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  componentWillMount() {				
		// This is a polyfill for FireFox and Safari
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
  }
  

  render() {
        return (
        	<div id="body_wasm"></div>
        );

  }
}

