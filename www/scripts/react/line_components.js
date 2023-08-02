'use strict';


// Message Line
class MsgLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "No message" };
  }
  
  componentWillMount() {
  if (this.props.message) {
  	this.setState({message: this.props.message});
  } else {
    fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=get_msg")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({message: result.msg});
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({message: "Error: No message from server"});
        }
      )
   }
  }

  render() {
  	let lineClass = this.props.color + " table-page";
  	
         return (
  		<p id="message_line" className={lineClass}>{this.state.message}</p>
		);
  }
}


// Семисегментный индикатор
class SevenSeg extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
         return (
        	<div id={this.props.id} className="seven-seg"></div>
		);
  }
}



// Спиннер
class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  let style = {"height": "100%"};
  			   
         return (
         <div className="d-flex justify-content-center" style={style}>
        	<div className="spinner-border text-primary" role="status" >
    				<span className="visually-hidden">Загрузка...</span>
  	    	</div>
  	    </div>

		);
  }
}


// Фрейм
class Frame extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {  			   
         return (
  	<frameset>
		<frame src={this.props.src} scrolling="no" noresize />
	</frameset>

		);
  }
}



