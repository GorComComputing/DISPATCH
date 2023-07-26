// Адрес текущего web-сервера
var Protocol = window.location.protocol;
var Host = window.location.hostname;
var Port = window.location.port;


// Заполнение страницы
let appArr = []; 	

appArr.push(<NavBar />); 

appArr.push(<ButtonModal caption="Добавить" color="btn-outline-primary" target="#insertModal"> <ModalAddDevice /> </ButtonModal>);
if (UserName != "") appArr.push(

<ButtonModal caption="Терминал" color="btn-outline-primary" target="#Terminal">	
	<ContainerModal caption="Терминал" id="Terminal">
		<Terminal/>	
	</ContainerModal>
</ButtonModal>);

appArr.push(<ButtonSimple caption="Обновить" onClick={Refresh} color="btn-outline-primary" />);	

appArr.push(<MsgLine />);	
appArr.push(<TableDevice />);	
appArr.push(<Pagination />);	

const application = ReactDOM.createRoot(document.getElementById("application"));
application.render(appArr);


// Обновление статуса
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


	

