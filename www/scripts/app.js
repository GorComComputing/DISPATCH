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
application.render(<Main/>);	// Рендер

console.log("Test");
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


console.log("Test2");

	
	
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


	

