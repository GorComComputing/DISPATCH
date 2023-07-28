'use strict';


// Devices page 
class Devices_page extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Refresh: false,
      
      curPage: 1,
      //prevPage: 0,
      //nextPage: 2,
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
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }

  render() {
  
  	let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModal">
			<ContainerModal caption="Добавить устройство" id="insertModal" max_width="500px">
 	 			<FormAddDevice /> 
 	 		</ContainerModal> 
		</ButtonModal>
		<Terminal_field />
		<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
		<MsgLine message="" color="bg-warning" />
		<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/> 
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
      //prevPage: 0,
      //nextPage: 2,
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
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }
  

  render() {

        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<Terminal_field />
		<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
		<MsgLine message="" color="bg-success" />
		<TableEvents key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/> 
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
      //prevPage: 0,
      //nextPage: 2,
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
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }

  render() {
  
        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<Terminal_field />
		<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />
		<MsgLine message="" color="bg-primary" />
		<TableUsers key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/>
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
      //prevPage: 0,
      //nextPage: 2,
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
  
  
  Click() {
  	this.setState((state) => ({
  		Refresh: !(state.Refresh)
	}));
	console.log(this.state.Refresh);
  }

  render() {

        return (
<ContainerSimple id="page"> 

	<ButtonToggle caption="Toggle Test" color="btn-outline-primary" target="#ToggleTest">	
		<ContainerToggle caption="Toggle Test" id="ToggleTest">
			<p>Toggle Testing...</p>
			<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/>
		</ContainerToggle>
	</ButtonToggle>
	
	<ButtonModal caption="Modal Test" color="btn-outline-primary" target="#ModalTest">	
		<ContainerModal caption="Modal Test" id="ModalTest">
			<p>Modal Testing...</p>
			<TableDevices key={this.state.Refresh} curPage={this.state.curPage} count={this.state.count} next={this.nextPageClick} prev={this.prevPageClick}/>
		</ContainerModal>
	</ButtonModal>
	
	<ButtonSimple caption="Обновить" onClick={this.Click} color="btn-outline-primary" />

	<MsgLine message="Тест" color="bg-warning" /> 
	
	<SevenSeg />
	
</ContainerSimple>
		);

  }
}

