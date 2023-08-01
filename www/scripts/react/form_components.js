'use strict';


// Modal Window Authentification
class FormAuth extends React.Component {
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
  return (
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
);
  
 }
}



// Modal Window Add Device
class FormAddDevice extends React.Component {
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
<form>   
      <div className="modal-body">
        <input type="hidden" name="backLink" value={BackLink} />
          <div className="mb-3">
            <label for="message-text" className="col-form-label">IP адрес:</label>
			<input type="text" className="form-control" name="ipaddr" id="ipaddr" value={this.state.ipaddr} onChange={this.handleChange} />
          </div>
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.addFunc(this.state.ipaddr)} className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
      </div>
</form>
);
  
 }
}


// Modal Window Delete Device
class FormDelDevice extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  	return (
<form>{/* action="/delete_device" method="POST"*/}
      <div className="modal-body">
		<label for="message-text" className="col-form-label">Вы действительно хотите удалить устройство {this.props.name} ?</label>
        <input type="hidden" name="id" value={this.props.id} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.delFunc(this.props.id)} className="btn btn-primary" data-bs-dismiss="modal">Удалить</button>
      </div>
</form>
		);
  
 }
}


// Modal Window Update Device
class FormUpdateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ipaddr: this.props.ipaddr};

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
   <form>
      <div className="modal-body">
          <div className="mb-3">
            <input type="hidden" name="id" value={this.props.id} />
            <label for="message-text" className="col-form-label">IP адрес:</label>
	    <input type="text" className="form-control" name="ipaddr" id="ipaddr" value={this.state.ipaddr} onChange={this.handleChange} />
          </div>
		 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.updFunc(this.props.id, this.state.ipaddr)} className="btn btn-primary" data-bs-dismiss="modal">Изменить</button>
      </div>
	  </form>
);
  
 }
}


// Modal Window Add User
class FormAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	login: '',
    	password: '',
    	role: ''
    };

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
<form>  
      <div className="modal-body">
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Имя пользователя:</label>
            <input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Логин:</label>
	    <input type="text" className="form-control" name="login" id="login" value={this.state.login} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Пароль:</label>
	    <input type="text" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Роль:</label>
	    <input type="text" className="form-control" name="role" id="role" value={this.state.role} onChange={this.handleChange} />
          </div>	 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.addFunc(this.state.name, this.state.login, this.state.password, this.state.role)} className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
      </div>
</form>
);
  
 }
}


// Modal Window Delete User
class FormDelUser extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  	return (
<form> 
      <div className="modal-body">
		<label for="message-text" className="col-form-label">Вы действительно хотите удалить пользователя {this.props.name} ?</label>
        <input type="hidden" name="id" value={this.props.id} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.delFunc(this.props.id)} className="btn btn-primary" data-bs-dismiss="modal">Удалить</button>
      </div>
</form>
		);
  
 }
}


// Modal Window Update User
class FormUpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: this.props.name,
    	login: this.props.login,
    	password: this.props.password,
    	role: this.props.role
    };

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
<form>
      <div className="modal-body">
          <div className="mb-3">
            <input type="hidden" name="id" value={this.props.id} />
            <label for="recipient-name" className="col-form-label">Имя пользователя:</label>
	    <input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Логин:</label>
	    <input type="text" className="form-control" name="login" id="login" value={this.state.login} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Пароль:</label>
	    <input type="text" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Роль:</label>
	    <input type="text" className="form-control" name="role" id="role" value={this.state.role} onChange={this.handleChange} />
          </div>	 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.updFunc(this.props.id, this.state.name, this.state.login, this.state.password, this.state.role)} className="btn btn-primary" data-bs-dismiss="modal">Изменить</button>
      </div>
</form>
);
  
 }
}


// Modal Window Add Event
class FormAddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	time: '',
    	object: '',
    	level: '',
    	source: '',
    	ident: '',
    	body: '',
    	is_check: ''
    };

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
<form>  
      <div className="modal-body">
          {/*<div className="mb-3">
            <label for="recipient-name" className="col-form-label">Время:</label>
            <input type="text" className="form-control" name="time" id="time" value={this.state.time} onChange={this.handleChange} />
          </div>*/}
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Объект:</label>
	    <input type="text" className="form-control" name="object" id="object" value={this.state.object} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Тип события:</label>
	    <input type="text" className="form-control" name="level" id="level" value={this.state.level} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Источник:</label>
	    <input type="text" className="form-control" name="source" id="source"  value={this.state.source} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Идентификатор события:</label>
	    <input type="text" className="form-control" name="ident" id="ident"  value={this.state.ident} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Детали:</label>
	    <input type="text" className="form-control" name="body" id="body"  value={this.state.body} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Просмотрено:</label>
	    <input type="text" className="form-control" name="is_check" id="is_check"  value={this.state.is_check} onChange={this.handleChange} />
          </div>	 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.addFunc(this.state.object, this.state.level, this.state.source, this.state.ident, this.state.body, this.state.is_check)} className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
      </div>
</form>
);
  
 }
}


// Modal Window Delete Event
class FormDelEvent extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  	return (
<form> 
      <div className="modal-body">
		<label for="message-text" className="col-form-label">Вы действительно хотите удалить событие {this.props.name} ?</label>
        <input type="hidden" name="id" value={this.props.id} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.delFunc(this.props.id)} className="btn btn-primary" data-bs-dismiss="modal">Удалить</button>
      </div>
</form>
		);
  
 }
}


// Modal Window Update Event
class FormUpdateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	time: this.props.time,
    	object: this.props.object,
    	level: this.props.level,
    	source: this.props.source,
    	ident: this.props.event,
    	body: this.props.body,
    	is_check: this.props.is_check
    };

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
<form>
      <div className="modal-body">
          <input type="hidden" name="id" value={this.props.id} />
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Объект:</label>
	    <input type="text" className="form-control" name="object" id="object" value={this.state.object} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Тип события:</label>
	    <input type="text" className="form-control" name="level" id="level" value={this.state.level} onChange={this.handleChange} />
          </div>
	  <div className="mb-3">
            <label for="message-text" className="col-form-label">Источник:</label>
	    <input type="text" className="form-control" name="source" id="source"  value={this.state.source} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Идентификатор события:</label>
	    <input type="text" className="form-control" name="ident" id="ident"  value={this.state.ident} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Детали:</label>
	    <input type="text" className="form-control" name="body" id="body"  value={this.state.body} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Просмотрено:</label>
	    <input type="text" className="form-control" name="is_check" id="is_check"  value={this.state.is_check} onChange={this.handleChange} />
          </div>	 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="button" onClick={() => this.props.updFunc(this.props.id, this.state.object, this.state.level, this.state.source, this.state.ident, this.state.body, this.state.is_check)} className="btn btn-primary" data-bs-dismiss="modal">Изменить</button>
      </div>
</form>
);
  
 }
}






