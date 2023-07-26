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
		let data_str = "";
   
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
						
				
    						
    						addVersion = result.softversion;
    						addName = result.description;//.replace(/\s/g,'_');
    					if (addName.includes(' ') ) {
    							data_str = "cmd=updatedev " + this.props.Id + " '" + addName + "' " + addVersion;
						} else {
    							data_str = "cmd=updatedev " + this.props.Id + " " + addName + " " + addVersion;
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
          this.setState({message: "Error: Устройство " + this.props.IP + " не отвечает"});
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



// Toggle Container
class ContainerToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	let style = {
  		"height": "80vh"
  	}

         return (
<div className="offcanvas offcanvas-top bg-black text-white" style={style} tabIndex="-1" id={this.props.id} aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasTopLabel">{this.props.caption}</h5>
    <button type="button" className="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  <div className="offcanvas-body d-flex">
  
  {this.props.children}
  
  </div> 
</div>
		);

  }
}



// Terminal 
class Terminal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

        return (
		<div id="terminal-container">Terminal disconnect</div>
		);

  }
}



// Navigation Bar
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
  	 let isUserNameYes;
 	 if (UserName){
 	 	isUserNameYes = [
 	 	<span className="navbar-text username">
			{UserName}  
		</span>,
		
		<form className="d-flex table-page" action="/logout" method="POST">
			<input type="hidden" name="backLink" value={BackLink} />
			<ButtonSubmit caption="Выход" color="btn-outline-primary" />
		</form>
		];
 	 
 	 } else {
 	 	isUserNameYes = 
 	 	<form className="d-flex">
 	 		<ButtonModal caption="Вход" color="btn-outline-primary" target="#authModal"> <ModalAuth /> </ButtonModal>
		</form>;
 	 }
  
         return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
	{/*<!--img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""-->*/}
	Диспетчер СУ</a>
  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
	
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/events">События</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/devices">Устройства</a>
        </li>
		<li className="nav-item">
          <a className="nav-link" href="/users">Пользователи</a>
        </li>
        {/*<!--li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Выпадающий список
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Действие</a></li>
            <li><a className="dropdown-item" href="#">Другое действие</a></li>
            <li><hr className="dropdown-divider"></li>
            <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Отключенная</a>
        </li-->*/}
      </ul>
      
        {/*<!--input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск"-->*/}
	{isUserNameYes}
    </div>
	
  </div>
</nav>
		);

  }
}


// Modal Container
class ContainerModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

         return (
<div className="modal fade" id={this.props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.props.caption}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
  
      <div className="modal-body">
	  
	  {this.props.children}
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Войти</button>
      </div>

    </div>
  </div>
</div>

		);

  }
}


// Modal Window Authentification
class ModalAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login: '',
    		  password:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    //console.log(": " + event.target.name + " " + event.target.value);
  }
  

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.login + " " + this.state.password);
    //event.preventDefault();
  }

  render() {
  return (<div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Авторизация</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <form action="/login" method="POST" onSubmit={this.handleSubmit}>  
      <div className="modal-body">
	  <input type="hidden" name="backLink" value={BackLink} />
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Логин:</label>
			<input type="text" className="form-control" name="login" id="login" value={this.state.login} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Пароль:</label>
			<input type="text" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </div>
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Войти</button>
      </div>
      </form>
    </div>
  </div>
</div>
);
  
 }
}



// Modal Window Add Device
class ModalAddDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ipaddr: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  

  handleSubmit(event) {
    //event.preventDefault();
  }

  render() {
  return (
<div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Добавить устройство</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
	  <form action="/insert_device" method="POST" onSubmit={this.handleSubmit}>
      <div className="modal-body">
        <input type="hidden" name="backLink" value={BackLink} />
          <div className="mb-3">
            <label for="message-text" className="col-form-label">IP адрес:</label>
			<input type="text" className="form-control" name="ipaddr" id="ipaddr" value={this.state.login} onChange={this.handleChange} />
          </div>
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
      </div>
	  </form>
    </div>
  </div>
</div>
);
  
 }
}



// Modal Window Delete Device
class ModalDelDevice extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  let id = "deleteModal" + this.props.id;
  let style = {"color" : "#000"};
  
  return (
<div style={style} className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Удалить устройство?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
	  <form action="/delete_device" method="POST">
	
      <div className="modal-body">
		<label for="message-text" className="col-form-label">Вы действительно хотите удалить устройство {this.props.name} ?</label>
        <input type="hidden" name="id" value={this.props.id} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" className="btn btn-primary">Удалить</button>
      </div>
	  </form>
    </div>
  </div>
</div>
);
  
 }
}


// Modal Window Update Device
class ModalUpdateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ipaddr: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  

  handleSubmit(event) {
    //event.preventDefault();
  }

  render() {
  let id = "updateModal" + this.props.id;
  let style = {"color" : "#000"};
  
  return (
<div style={style} className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Изменить IP-адрес</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
	  <form action="/update_device" method="POST">
	  
      <div className="modal-body">
          <div className="mb-3">
            <input type="hidden" name="id" value={this.props.id} />
            <label for="message-text" className="col-form-label">IP адрес:</label>
			<input type="text" className="form-control" name="ipaddr" id="ipaddr" value={this.state.ipaddr} onChange={this.handleChange} />
          </div>
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Изменить</button>
      </div>
	  </form>
    </div>
  </div>
</div>
);
  
 }
}


/*
// Input
class Input extends React.Component {
  state = {value: ''}
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  componentDidMount() {
    document.addEventListener(
      "input",
      () => {
        // COMMENT OUT THIS LINE TO FIX:
        this.setState({});
      },
      true
    );
  }
  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}*/


/* Ввод в Input
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}*/



// Постраничная навигация
class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let linkPrev = BackLink +"?page=" + PrevPage;
    let linkCur = BackLink +"?page=" + PrevPage;
    let linkNext = BackLink +"?page=" + NextPage;
  
    return (
    
<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center pagination-sm">
    <li className="page-item disabled">
      <a className="page-link" href="#" tabindex="-1">Пред.</a>
    </li>
    <li className="page-item"><a className="page-link" href={linkPrev}>{PrevPage}</a></li>
    <li className="page-item"><span className="page-link">{CurPage}</span></li>
    <li className="page-item"><a className="page-link" href={linkNext}>{NextPage}</a></li>
    <li className="page-item">
      <a className="page-link" href="#">След.</a>
    </li>
  </ul>
</nav>


    );
  }
}



// Таблица устройств
class TableDevice extends React.Component {
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
  let ListDev = [];
  
  arrDevice.forEach(function(item, i, arr) {
  	let listGNSS;
  	let listPTP;
  	console.log(item.GNSS);
  
  	if (item.GNSS == "true") listGNSS = [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>];
     	else listGNSS = [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>];
     	       
	if (item.PTP == "true") 
	listPTP = [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>]; 
     else listPTP = [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>]; 
     
     	var PZG_VZG_style = {textTransform : "uppercase"};

  	//alert( i + ": " + item + " (массив:" + arr + ")" );
  	let Id = "mesg_base" + item.Id;
  	let link_sync = "http://" + item.IPaddr + "/sync.html";
  	let link_index = "http://" + item.IPaddr + "/index.html";
  	let link_ptp = "http://" + item.IPaddr + "/ptp" + item.PZG_VZG + ".html";
  	let link_gnss = "http://" + item.IPaddr + "/gnss.html";
  	let target = "#offcanvasTop" + item.Id;
  	let gnss_ref = "seven-seg-array-gnss_ref" + item.Id;
  	let ptp_ref = "seven-seg-array-ptp_ref" + item.Id;
  	
  	ListDev.push( <tr> 
  	<td width="50px"><div id={Id}>{listGNSS} / {listPTP}</div></td> 
  	<td style={PZG_VZG_style} width="50px">{item.PZG_VZG}</td>
    	<td className="name">{item.Name }</td>
    	<td><div id={gnss_ref} className="seven-seg"></div></td>
    	<td><div id={ptp_ref} className="seven-seg"></div></td>
	<td className="ipaddr" width="70px">{item.IPaddr}</td>
	<td className="version" width="170px">{item.Version}</td>
	
	<td class="flex">
		<ButtonLink caption="Menu" color="btn-warning" href={link_index} />
		<ButtonLink caption="Sync" color="btn-outline-warning" href={link_sync} />
		<ButtonLink caption="PTP" color="btn-outline-warning" href={link_ptp} />
		<ButtonLink caption="GNSS" color="btn-outline-warning" href={link_gnss} />

		<ButtonToggleDebug caption="Debug" color="btn-outline-primary" target={target} Id={item.Id} IP={item.IPaddr} />
		<ButtonModal caption="Debug" color="btn-outline-primary" target={target} Id={item.Id} IP={item.IPaddr}>
			<ContainerModal caption={item.Name} id={item.Id} ipaddr={item.IPaddr} name={item.Name} PZG_VZG={item.PZG_VZG}>
				<PanelDebug id={item.Id} ipaddr={item.IPaddr} name={item.Name} PZG_VZG={item.PZG_VZG} />	
			</ContainerModal>
		</ButtonModal>
		
		
		<ModalDelDevice id={item.Id} name={item.Name} />
		<ModalUpdateDevice id={item.Id} ipaddr={item.IPaddr} />
		{/*<PanelDebug id={item.Id} ipaddr={item.IPaddr} name={item.Name} PZG_VZG={item.PZG_VZG} />*/}
		
		
			<ContainerModal caption={item.Name} id={item.Id} ipaddr={item.IPaddr} name={item.Name} PZG_VZG={item.PZG_VZG}>
				<PanelDebug id={item.Id} ipaddr={item.IPaddr} name={item.Name} PZG_VZG={item.PZG_VZG} />	
			</ContainerModal>
		
	</td>
  	</tr>);
  });

var tbody_style = {borderTop: 0};

  
    return (
    
<table className="table table-bordered table-dark table-page">
<thead>
  <tr>
    <th scope="col">gnss/ptp</th>
    <th scope="col">Режим</th>
    <th scope="col">Название</th>
    <th scope="col">gnss ref</th>
    <th scope="col">ptp ref</th>
    <th scope="col">IP адрес</th>
    <th scope="col">Версия прошивки</th>
    <th scope="col"></th>
  </tr>
</thead>
  
  <tbody style={tbody_style}>
  {ListDev}
  </tbody>
</table> 

    );
  }
}


// Панель Отладки
class PanelDebug extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
  let id = "offcanvasTop" + this.props.id;
  let idLabel = "offcanvasTopLabel" + this.props.id;
  let idUpdate = "#updateModal" + this.props.id;
  let idDel = "#deleteModal" + this.props.id;
  let idSpar = "spar" + this.props.id;
  let IPaddr = "ipaddr" + this.props.id;
  let Status = "status" + this.props.id;
  let Version = "version" + this.props.id;
  
  let link_sync = "http://" + this.props.ipaddr + "/sync.html";
  let link_index = "http://" + this.props.ipaddr + "/index.html";
  let link_ptp = "http://" + this.props.ipaddr + "/ptp" + this.props.PZG_VZG + ".html";
  let link_gnss = "http://" + this.props.ipaddr + "/gnss.html";
  
  let style = {height: "80vh"};
  let table_style = {width: "600px"};
  
    return (
    
<div className="offcanvas offcanvas-top bg-black text-white" style={style} tabIndex="-1" id={id} aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
  <div className="d-flex"> 

    <h5 id={idLabel}>{this.props.name}</h5>
    
    <ButtonCurlBase caption="Обновить в базе" onClick={this.Click} color="btn-outline-warning" Id={this.props.id} IP={this.props.ipaddr} Cmd="getver" />

    <button type="button" className="btn btn-primary btn-sm add" data-bs-toggle="modal" data-bs-target={idUpdate}>Изменить IP-адрес</button>
    <button type="button" className="btn btn-danger btns btn-sm add" data-bs-toggle="modal" data-bs-target={idDel}>Удалить</button>
  </div>



    <button type="button" className="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  
  <div className="offcanvas-body">
  
  <div className="d-flex">
  <div>
{/*  
  <div id="mesg{{ .Id }}" style="margin-right: 10px; line-height: 2">
        gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg> &nbsp; 
    	ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>
  </div>
    
  */}  
    <table className="table table-dark table-sm" style={table_style}>
    <thead>

      <tr>
        <td><label for="message-text" className="col-form-label">IP-адрес:</label></td>
        <td><label id={IPaddr} for="message-text" className="col-form-label"></label></td>
      </tr>
      <tr>
        <td><label for="message-text" className="col-form-label">Режим:</label></td>
        <td><label id={Status} for="message-text" className="col-form-label"></label></td>
      </tr>
      <tr>
        <td><label for="message-text" className="col-form-label">Версия прошивки:</label></td>
        <td><label id={Version} for="message-text" className="col-form-label"></label></td>
      </tr>
      </thead>
  

  </table>
 </div>

<div className="d-grid col-1">
		<ButtonLink caption="Menu" color="btn-dark" href={link_index} />
		<ButtonLink caption="Sync" color="btn-dark" href={link_sync} />
		<ButtonLink caption="PTP" color="btn-dark" href={link_ptp} />
		<ButtonLink caption="GNSS" color="btn-dark" href={link_gnss} />
</div>

</div>

  
  <div className="d-flex">
  <table>
      <tr>
        <td><textarea rows="25" cols="80" className="usage" id={idSpar}></textarea></td>
      </tr>
  </table>
  
 
  
  <div className="d-grid col-2">
  	<ButtonCurl caption="GNSS" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getgnss" />
	<ButtonCurl caption="Состояние приемника" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="stgpsmon" />
	<ButtonCurl caption="Версия и параметры названия" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getver" />
	<ButtonCurl caption="Настройки сети" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getconfig" />
	<ButtonCurl caption="МАС-адрес и серийный номер" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getmac" />
	<ButtonCurl caption="Конфигурация синхронизации" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getsync" />
 	<ButtonCurl caption="Конфигурация PTP" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getptp" />
 	<ButtonCurl caption="Данные состояния PTP" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getptpdata" /> 
  </div>
  
  </div>
  
   
 </div>
  

</div>  



    );
  }
}

