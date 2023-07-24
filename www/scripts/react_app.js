let appArr = []; 	

appArr.push(<NavBar />); 

appArr.push(<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModal"> <ModalAddDevice /> </ButtonModal>);
if (UserName != "") appArr.push(<ButtonToggle caption="Терминал" color="btn-outline-primary" target="#offcanvasTopTerminal"> <PanelTerminal /> </ButtonToggle>);
appArr.push(<ButtonSimple caption="Обновить" color="btn-outline-primary" id="btnRefresh" />);	

appArr.push(<MsgLine caption={Message} />);	
appArr.push(<TableDevice />);	
appArr.push(<Pagination />);	



const application = ReactDOM.createRoot(document.getElementById("application"));
application.render(appArr);

	
	
/*if (UserName != "") {
	

	const termContainer = ReactDOM.createRoot(document.getElementById("termContainer"));
	termContainer.render(
  <div className="offcanvas offcanvas-top bg-black text-white for-terminal"  tabIndex="-1" id="offcanvasTopTerminal" aria-labelledby="offcanvasTopLabel">
	<div className="offcanvas-header">
    <h5 id="offcanvasTopLabel">Терминал</h5>
    <button type="button" className="btn btn-outline-secondary btns btn-sm add text-reset" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
  </div>
  		<div className="offcanvas-body d-flex">
		<div id="terminal-container">
		</div>
		</div>
  </div>);


	//createTerminal();
	console.log(UserName + ":Term Create");
}*/


	

