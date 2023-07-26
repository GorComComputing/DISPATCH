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











