'use strict';


// Simple Container
class ContainerSimple extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
         return (
		<div id={this.props.id}>
			{this.props.children}
		</div>
		);
  }
}


// Toggle Container
class ContainerToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	 let style = {"height": "80vh",
  	 	      "top": "130px"}

         return (
<div className="offcanvas offcanvas-bottom bg-black text-white" style={style} tabIndex="-1" id={this.props.id} aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasTopLabel">{this.props.caption}</h5>
    <button type="button" className="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  <div className="offcanvas-body">
  
  {this.props.children}
  
  </div> 
</div>
		);

  }
}



// Modal Container
class ContainerModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	 let max_width = "100%";
  	 if (this.props.max_width) max_width = this.props.max_width;
  	 let style = {"max-width": max_width,
  	 	      "color" : "#000"}
  	 let background_color = "#fff";
         if (this.props.background_color) background_color = this.props.background_color;
  	 let style_content = {"background-color": background_color}
  	 
         return (
<div className="modal fade" id={this.props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" style={style}>
    <div className="modal-content" style={style_content}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.props.caption}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
  
	  {this.props.children}
		 
    </div>
  </div>
</div>
		);

  }
}





