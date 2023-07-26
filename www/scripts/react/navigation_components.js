'use strict';


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
 	 		<ButtonModal caption="Вход" color="btn-outline-primary" target="#authModal"> 
 	 			<ContainerModal caption="Авторизация" id="authModal" max_width="500px">
 	 				<FormAuth /> 
 	 			</ContainerModal>
 	 		</ButtonModal>
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


