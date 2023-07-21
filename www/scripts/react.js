'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    /*return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );*/
    
    
    return (
  		<button onClick={() => this.setState({ liked: true })}>
    		Нравится
  		</button>
	);
  }
}


// Button Terminal
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
 
  	

         return (
  		<button id={this.props.id} className="btn btn-outline-primary btn-sm add" type="button" data-bs-toggle={this.props.toggle} data-bs-target={this.props.target} aria-controls="offcanvasTop">{this.props.caption}</button>
		);

  }
}


// Message Line
class MsgLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

         return (
  		<p id="app" className="bg-warning table-page">{this.props.caption}</p>
		);

  }
}


// Terminal Container
class ContainerTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
	//if (UserName != "") {
         return (
<div className="offcanvas offcanvas-top bg-black text-white" style="height: 80vh" tabIndex="-1" id="offcanvasTopTerminal" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Терминал</h5>
    <button type="button" class="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  <div class="offcanvas-body d-flex">
  
  <div id="terminal-container"></div>

   
  </div> 
</div>
		);
    //} else {
    //	return "";
    //}
  }
}




//const root1 = ReactDOM.createRoot(document.getElementById("app1"));
//root1.render(<h1>Hello React</h1>);
 
  

	
	
if (UserName != "") {
	
	const btnTerminal = ReactDOM.createRoot(document.getElementById("btnsMenu"));
	btnTerminal.render(<span>
		<Button caption="Добавить" toggle="modal" target="#insertModal" />
		<Button caption="Терминал" toggle="offcanvas" target="#offcanvasTopTerminal" />
		<Button caption="Обновить" id="btnRefresh" />
						</span>);	



	const termContainer = ReactDOM.createRoot(document.getElementById("termContainer"));
	termContainer.render(
  <div className="offcanvas offcanvas-top bg-black text-white for-terminal"  tabIndex="-1" id="offcanvasTopTerminal" aria-labelledby="offcanvasTopLabel">
	<div className="offcanvas-header">
    <h5 id="offcanvasTopLabel">Терминал</h5>
    <button type="button" className="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  		<div className="offcanvas-body d-flex">
		<div id="terminal-container">
		</div>
		</div>
  </div>);


	//createTerminal();
	console.log(UserName + ":Term Create");
}

if (Message != "") {
	const message = ReactDOM.createRoot(document.getElementById("message"));
	message.render(<MsgLine caption={Message} />);	


}
	

