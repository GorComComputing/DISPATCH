'use strict';


// Button Submit
class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return (
  		<button id={this.props.id} className={btnClass} type="submit">{this.props.caption}</button>
		);

  }
}


// Button Simple
class ButtonSimple extends React.Component {
  constructor(props) {
    super(props);
    
  this.handleClick = this.props.onClick;
    //this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return (
  		<button id={this.props.id} className={btnClass} type="button" onClick={this.handleClick}>{this.props.caption}</button>
		);

  }
}


// Button Link
class ButtonLink extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return (
         <a className={btnClass} href={this.props.href} target="_blank" role="button">{this.props.caption}</a>
		);

  }
}


// Button Curl
class ButtonCurl extends React.Component {
  constructor(props) {
    super(props);
    
    //this.handleClick = this.props.onClick;
    this.Click = this.Click.bind(this);
  }
  
  Click() {
   
  fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=curlj "+this.props.Cmd+" http://"+this.props.IP+"/cgi-bin/configs.cgi?")
      .then((response) => response.json())
      .then(
        (result) => {
          //this.setState({message: result.msg});
          	let res = "";
    		for (var i in result) {
 
        		res += i + ": " + result[i] + "\n";
   	 		}
          	$("#spar"+this.props.Id).val(res);
          
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          	$("#spar"+this.props.Id).val("Error: Устройство " + this.props.IP + " не отвечает");
        }
      )

  }
  
  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return (
  		<button className={btnClass} type="button" onClick={this.Click}>{this.props.caption}</button>
		);

  }
}


// Button Curl Base
class ButtonCurlBase extends React.Component {
  constructor(props) {
    super(props);
    
    //this.handleClick = this.props.onClick;
    this.Click = this.Click.bind(this);
  }
  
  Click() {
  
  		var addName = "";
		var addVersion = "";
		var addMode = "";
		var addGNSS = "";
		var addPTP = "";
		let data_str = "";
		
		
		fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=curlj getsync http://"+this.props.IP+"/cgi-bin/configs.cgi?")
      			.then((response) => response.json())
      			.then(
        			(result) => {
					addGNSS = result.gnss;
					addPTP = result.ptp;
				},
        			(error) => {
        				$("#spar"+this.props.Id).val("Error: Устройство " + this.props.IP + " не отвечает");
        				console.log("Error: Устройство " + this.props.IP + " не отвечает");
        			}
      			)
   
  fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=curlj "+this.props.Cmd+" http://"+this.props.IP+"/cgi-bin/configs.cgi?")
      .then((response) => response.json())
      .then(
        (result) => {
          				$("#offcanvasTopLabel"+this.props.Id).empty();
						$("#offcanvasTopLabel"+this.props.Id).prepend(result.description);
						
						$("#ipaddr"+this.props.Id).empty();
						$("#ipaddr"+this.props.Id).prepend(this.props.IP);
						
						$("#status"+this.props.Id).empty();
						$("#status"+this.props.Id).prepend(result.mode);
						
						$("#version"+this.props.Id).empty();
    						$("#version"+this.props.Id).prepend(result.softversion);
          	
						$("#ptp"+this.props.Id).empty();
						$("#ptp"+this.props.Id).prepend(result.ptp);
						
//BTS-377144 10.1.10.4	2.01.55
    						
    						addVersion = result.softversion;
    						addMode = result.mode;
    						
    						

    						addName = result.description;//.replace(/\s/g,'_');
    					if (addName.includes(' ') ) {
    							data_str = "cmd=updatedev " + this.props.Id + " '" + addName + "' " + addVersion + "' " + addMode + "' " + addGNSS + "' " + addPTP;
						} else {
    							data_str = "cmd=updatedev " + this.props.Id + " " + addName + " " + addVersion + " " + addMode + " " + addGNSS  + " " + addPTP;
						}
						
						console.log(data_str);
						
						if (fetch(Protocol+"//"+Host+":"+Port+"/api?" + data_str)) {
						
						$("#spar"+this.props.Id).val('Параметры сохранены в базе');
						} else {
						 $("#spar"+this.props.Id).val("Error: Не удалось сохранить параметры устройства в базе");
						}
										
          
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
        	$("#spar"+this.props.Id).val("Error: Устройство " + this.props.IP + " не отвечает");
        }
      )
      
      
      

  }
  
  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return (
  		<button className={btnClass} type="button" onClick={this.Click}>{this.props.caption}</button>
		);

  }
}


// Button Modal
class ButtonModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return ([
  		<button id={this.props.id} className={btnClass} type="button" data-bs-toggle="modal" data-bs-target={this.props.target}>{this.props.caption}</button>,
  		this.props.children
		]);

  }
}


// Button Toggle
class ButtonToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return ([
  		<button id={this.props.id} className={btnClass} type="button" data-bs-toggle="offcanvas" data-bs-target={this.props.target} aria-controls="offcanvasTop">{this.props.caption}</button>,
  		this.props.children
		]);

  }
}


// Button Toggle Debug
class ButtonToggleDebug extends React.Component {
  constructor(props) {
    super(props);
    
  	//this.handleClick = this.props.onClick;
    this.Click = this.Click.bind(this);
  }
  
  Click() {
   
  fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=curlj getver http://"+this.props.IP+"/cgi-bin/configs.cgi?")
      .then((response) => response.json())
      .then(
        (result) => {
          //this.setState({message: result.msg});
          	//let res = "";
    		//for (var i in result) {
        	//	res += i + ": " + result[i] + "\n";
   	 		//}
          				$("#offcanvasTopLabel"+this.props.Id).empty();
						$("#offcanvasTopLabel"+this.props.Id).prepend(result.description);
						
						$("#ipaddr"+this.props.Id).empty();
						$("#ipaddr"+this.props.Id).prepend(this.props.IP);
						
						$("#status"+this.props.Id).empty();
						$("#status"+this.props.Id).prepend(result.mode);
						
						$("#version"+this.props.Id).empty();
    					$("#version"+this.props.Id).prepend(result.softversion);
          
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          $("#spar"+this.props.Id).val("Error: Устройство " + this.props.IP + " не отвечает");
        }
      )


	reqStatusGNSS_PTP(this.props.IP, this.props.Id);
  }

  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return ([
  		<button id={this.props.id} className={btnClass} type="button" onClick={this.Click} data-bs-toggle="offcanvas" data-bs-target={this.props.target} aria-controls="offcanvasTop">{this.props.caption}</button>,
  		this.props.children
		]);

  }
}


// Button Modal Debug
class ButtonModalDebug extends React.Component {
  constructor(props) {
    super(props);
    
  	//this.handleClick = this.props.onClick;
    this.Click = this.Click.bind(this);
  }
  
  Click() {
   
  fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=curlj getver http://"+this.props.IP+"/cgi-bin/configs.cgi?")
      .then((response) => response.json())
      .then(
        (result) => {
          //this.setState({message: result.msg});
          	//let res = "";
    		//for (var i in result) {
        	//	res += i + ": " + result[i] + "\n";
   	 		//}
          				$("#offcanvasTopLabel"+this.props.Id).empty();
						$("#offcanvasTopLabel"+this.props.Id).prepend(result.description);
						
						$("#ipaddr"+this.props.Id).empty();
						$("#ipaddr"+this.props.Id).prepend(this.props.IP);
						
						$("#status"+this.props.Id).empty();
						$("#status"+this.props.Id).prepend(result.mode);
						
						$("#version"+this.props.Id).empty();
    					$("#version"+this.props.Id).prepend(result.softversion);
          
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          $("#spar"+this.props.Id).val("Error: Устройство " + this.props.IP + " не отвечает");
        }
      )


	reqStatusGNSS_PTP(this.props.IP, this.props.Id);
  }

  render() {
	 let btnClass = "btn " + this.props.color + " btn-sm add";
         return ([
  		<button id={this.props.id} className={btnClass} type="button" onClick={this.Click} data-bs-toggle="modal" data-bs-target={this.props.target} aria-controls="offcanvasTop">{this.props.caption}</button>,
  		this.props.children
		]);

  }
}



