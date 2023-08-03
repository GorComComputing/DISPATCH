'use strict';


// Devices page 
class Devices_page extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Refresh: false,
      curPage: 1,
      count: 10
    };
    
    
    this.Click = this.Click.bind(this);
    this.nextPageClick = this.nextPageClick.bind(this);
    this.prevPageClick = this.prevPageClick.bind(this);
    this.Insert_Dev_JSON = this.Insert_Dev_JSON.bind(this);
    this.Delete_Dev_JSON = this.Delete_Dev_JSON.bind(this);
    this.Update_Dev_JSON = this.Update_Dev_JSON.bind(this);
  }
  
  
  nextPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage + 1
	}));
	this.Click();
  }
  
  prevPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage - 1
	}));
	this.Click();
  }
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }
  
  
  Insert_Dev_JSON(ipaddr){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'ins_dev',
      ipaddr: ipaddr,
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )       
  }
  
  
  Delete_Dev_JSON(id){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'del_dev',
      id: id.toString(),
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  
  
  Update_Dev_JSON(id, ipaddr){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'upd_dev',
      id: id.toString(),
      ipaddr: ipaddr.toString(),
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  

  render() {
  
  	let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModalDevice">
			<ContainerModal caption="Добавить устройство" id="insertModalDevice" max_width="500px">
 	 			<FormAddDevice addFunc={this.Insert_Dev_JSON} /> 
 	 		</ContainerModal> 
		</ButtonModal>
		<Terminal_field/>
		<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
		<MsgLine message="" color="bg-warning" />
		<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick} delFunc={this.Delete_Dev_JSON} updFunc={this.Update_Dev_JSON}/> 
	</ContainerSimple>
		);

  }
}


// Events page 
class Events_page extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Refresh: false,
      curPage: 1,
      count: 10
    };
    
    this.Click = this.Click.bind(this);
    this.nextPageClick = this.nextPageClick.bind(this);
	this.prevPageClick = this.prevPageClick.bind(this);
	this.Insert_Event_JSON = this.Insert_Event_JSON.bind(this);
    this.Delete_Event_JSON = this.Delete_Event_JSON.bind(this);
    this.Update_Event_JSON = this.Update_Event_JSON.bind(this);
  }
  
  
  nextPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage + 1
	}));
	this.Click();
  }
  
  prevPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage - 1
	}));
	this.Click();
  }
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }
  
  
  Insert_Event_JSON(object, level, source, ident, body, is_check){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'ins_evnt',
      object: object, 
      level: level,
      source: source,
      ident: ident,
      body: body,
      is_check: is_check
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )       
  }
  
  
  Delete_Event_JSON(id){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'del_evnt',
      id: id.toString(),
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  
  
  Update_Event_JSON(id, object, level, source, ident, body, is_check){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'upd_evnt',
      id: id.toString(),
      object: object.toString(),
      level: level.toString(),
      source: source.toString(),
      ident: ident.toString(),
      body: body.toString(),
      is_check: is_check.toString()
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  
  

  render() {

        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
        	<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModalEvent">
				<ContainerModal caption="Добавить событие" id="insertModalEvent" max_width="500px">
 	 				<FormAddEvent addFunc={this.Insert_Event_JSON} /> 
 	 			</ContainerModal> 
			</ButtonModal>
			<Terminal_field />
			<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
			<MsgLine message="" color="bg-success" />
			<TableEvents key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick} delFunc={this.Delete_Event_JSON} updFunc={this.Update_Event_JSON}/> 
	</ContainerSimple>
		);

  }
}


// Users page 
class Users_page extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Refresh: false, 
      curPage: 1,
      count: 10
    };
    
    this.Click = this.Click.bind(this);
    this.nextPageClick = this.nextPageClick.bind(this);
	this.prevPageClick = this.prevPageClick.bind(this);
	this.Insert_User_JSON = this.Insert_User_JSON.bind(this);
    this.Delete_User_JSON = this.Delete_User_JSON.bind(this);
    this.Update_User_JSON = this.Update_User_JSON.bind(this);
  }
  
  
  nextPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage + 1
	}));
	this.Click();
  }
  
  prevPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage - 1
	}));
	this.Click();
  }
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }
  
  
  Insert_User_JSON(name, login, password, role){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'ins_usr',
      name: name, 
      login: login,
      password: password,
      role: role
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )       
  }
  
  
  Delete_User_JSON(id){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'del_usr',
      id: id.toString(),
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  
  
  Update_User_JSON(id, name, login, password, role){   

  fetch(Protocol+"//"+Host+":"+Port+"/json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cmd: 'upd_usr',
      id: id.toString(),
      name: name.toString(),
      login: login.toString(),
      password: password.toString(),
      role: role.toString(),
    }),
  })
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
        	if(result){
  			var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = result.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
  		}
  			this.Click();
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("Error");
        }
      )     
  }
  

  render() {
  
        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
        	<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModalUser">
				<ContainerModal caption="Добавить пользователя" id="insertModalUser" max_width="500px">
 	 				<FormAddUser addFunc={this.Insert_User_JSON} /> 
 	 			</ContainerModal> 
			</ButtonModal>
			<Terminal_field />
			<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
			<MsgLine message="" color="bg-primary" />
			<TableUsers key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick} delFunc={this.Delete_User_JSON} updFunc={this.Update_User_JSON}/>
		</ContainerSimple>
		);

  }
}


// Test page 
class Test_page extends React.Component {
  constructor(props) {
    super(props);
    
  	this.state = {
      Refresh: false,     
      curPage: 1,
      count: 10
    };
    
    this.Click = this.Click.bind(this);
    this.nextPageClick = this.nextPageClick.bind(this);
	this.prevPageClick = this.prevPageClick.bind(this);
  }
  
  
  nextPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage + 1
	}));
	this.Click();
  }
  
  prevPageClick() {
  	this.setState((state) => ({
  		curPage: state.curPage - 1
	}));
	this.Click();
  }
  
  
  Click(){
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }
  
  
  SendJSON(){             
            // Creating a XHR object
            let xhr = new XMLHttpRequest();
            let url = "/json";
       
            // open a connection
            xhr.open("POST", url, true);
 
            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("Content-Type", "application/json");
 
            // Create a state change callback
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                	var resp = JSON.parse(this.responseText);
                	console.log(resp.msg);
                
                	var box = document.getElementById("toast-body");
                	console.log(box.innerHTML);
    			box.innerHTML = resp.msg;
    	
    			var toastLiveExample = document.getElementById("liveToast")
    			var toast = new bootstrap.Toast(toastLiveExample)
    			toast.show()
                    	//console.log(this.responseText);
                }
            };
 
            // Converting JSON data to string
            //var data = JSON.stringify({ "name": "Sergey", "email": "123", "cmd": "get_msg"});
            //var data = JSON.stringify({ "cmd": "get_dev 1 5"});
            var data = JSON.stringify({ "cmd": "ins_dev", "ipaddr": "123", "name": "Sergey", "email": "@13"});


            // Sending data with the request
            xhr.send(data);	
  }

  render() {

        return (
<ContainerSimple id="page"> 

	<ButtonToggle caption="Toggle Test" color="btn-outline-primary" target="#ToggleTest">	
		<ContainerToggle caption="Toggle Test" id="ToggleTest">
			<p>Toggle Testing...</p>
			{/*<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/>*/}
			<Frame src="https://www.opennet.ru/base/net/snmp_traps.txt.html" / >
		</ContainerToggle>
	</ButtonToggle>
	
	<ButtonModal caption="Modal Test" color="btn-outline-primary" target="#ModalTest">	
		<ContainerModal caption="Modal Test" id="ModalTest">
			<p>Modal Testing...</p>
			{/*<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/>*/}
			<Frame src="https://www.opennet.ru/base/net/snmp_traps.txt.html" / >
		</ContainerModal>
	</ButtonModal>
	
	<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
	
	<ButtonSimple caption="Send JSON" onClick={this.SendJSON} color="btn-outline-danger" />	
	
	<ButtonModal caption="Wasm" color="btn-outline-warning" target="#ModalWasm">	
		<ContainerModal caption="Wasm" id="ModalWasm" max_width="642px">
			<Wasm />
		</ContainerModal>
	</ButtonModal>

	<MsgLine message="Тест" color="bg-warning" /> 
	
	

</ContainerSimple>
		);

  }
}

