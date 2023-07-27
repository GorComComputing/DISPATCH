// Адрес текущего web-сервера ------------------------------------------------------------------
var Protocol = window.location.protocol;
var Host = window.location.hostname;
var Port = window.location.port;

// React Router --------------------------------------------------------------------------------
const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Routes =  window.ReactRouterDOM.Routes;
const Link =  window.ReactRouterDOM.Link;
const NavLink =  window.ReactRouterDOM.NavLink;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;




 

// Заполнение страницы -------------------------------------------------------------------------
const application = ReactDOM.createRoot(document.getElementById("application"));
let appArr = []; 	 
  
// Основная страница----------------------------------------------------------------------------
appArr.push(<NavBar />); 

appArr.push(<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModal">
		<ContainerModal caption="Добавить устройство" id="insertModal" max_width="500px">
 	 		<FormAddDevice /> 
 	 	</ContainerModal> 
	    </ButtonModal>);
	    
if (UserName != "") appArr.push(
	<ButtonToggle caption="Терминал" color="btn-outline-primary" target="#Terminal">	
		<ContainerToggle caption="Терминал" id="Terminal">
			<Terminal/>	
		</ContainerToggle>
	</ButtonToggle>);
	
appArr.push(<ButtonSimple caption="Обновить" onClick={Refresh} color="btn-outline-primary" />);	


appArr.push(
	<ReactRouterDOM.HashRouter>
	<Routes>
		<Route path="/" exact element={<ContainerSimple id="page"> 
				<MsgLine message="" />
				<TableDevice />
				<Pagination />
	    	   </ContainerSimple>} />
          	<Route path="/events" element={<Terminal />} />
          	<Route path="/devices" element={<ContainerSimple id="page"> 
				<MsgLine message="" />
				<TableDevice />
				<Pagination />
	    	   </ContainerSimple>} />
          	<Route path="/users" element={<PanelDebug />} />
          </Routes>
          </ReactRouterDOM.HashRouter>

);
	    
	    
	    
appArr.push(<ButtonToggle caption="Toggle Test" color="btn-outline-primary" target="#ToggleTest">	
		<ContainerToggle caption="Toggle Test" id="ToggleTest">
			<p>Toggle Testing...</p>
			<TableDevice />
			<Pagination />	
		</ContainerToggle>
	    </ButtonToggle>);	
	    
	    
	    
appArr.push(<ButtonModal caption="Modal Test" color="btn-outline-primary" target="#ModalTest">	
		<ContainerModal caption="Modal Test" id="ModalTest">
			<p>Modal Testing...</p>
			<TableDevice />
			<Pagination />	
		</ContainerModal>
	   </ButtonModal>);  
	   
	   
appArr.push(<SevenSeg  /> );  	

	   



application.render(appArr);	// Рендер


// Обновление статуса -------------------------------------------------------------------------
var ptplen_old = 0;
var gnsslen_old = 0;
// Запрос статуса GNSS/PTP каждый 15 сек		
setInterval(function() {
	//Перебор массива
	arrDevice.forEach(function(item, i, arr) {
  		reqStatusGNSS_PTP(item.IPaddr, item.Id);
	});
}, 15000);




	
	
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


	

