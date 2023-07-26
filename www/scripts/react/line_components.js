'use strict';


// Message Line
class MsgLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "No message" };
  }
  
  componentWillMount() {
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

  render() {
         return (
  		<p id="message_line" className="bg-warning table-page">{this.state.message}</p>
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
