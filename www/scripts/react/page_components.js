'use strict';


// Devices page 
class Devices_page extends React.Component {
  constructor(props) {
    super(props);
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
		<ButtonSimple caption="Обновить" onClick={Refresh} color="btn-outline-primary" />
		<MsgLine message="" color="bg-warning" />
		<TableDevices /> 
	</ContainerSimple>
		);

  }
}


// Events page 
class Events_page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<Terminal_field />
		<MsgLine message="" color="bg-success" />
		<TableEvents /> 
	</ContainerSimple>
		);

  }
}


// Users page 
class Users_page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
        let Terminal_field = "";	    
	if (UserName != "") 
		Terminal_field = props => <Terminal/>

        return (
        <ContainerSimple id="page"> 
		<Terminal_field />
		<MsgLine message="" color="bg-primary" />
		<TableUsers />
	</ContainerSimple>
		);

  }
}


// Test page 
class Test_page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

        return (
<ContainerSimple id="page"> 

	<ButtonToggle caption="Toggle Test" color="btn-outline-primary" target="#ToggleTest">	
		<ContainerToggle caption="Toggle Test" id="ToggleTest">
			<p>Toggle Testing...</p>
			<TableDevices />
		</ContainerToggle>
	</ButtonToggle>
	
	<ButtonModal caption="Modal Test" color="btn-outline-primary" target="#ModalTest">	
		<ContainerModal caption="Modal Test" id="ModalTest">
			<p>Modal Testing...</p>
			<TableDevices />
		</ContainerModal>
	</ButtonModal>

	<MsgLine message="Тест" color="bg-warning" /> 
	
	<SevenSeg />
	
</ContainerSimple>
		);

  }
}

