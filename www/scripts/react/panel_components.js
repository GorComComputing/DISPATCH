'use strict';


// Terminal 
class Terminal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

        return (
        	<ButtonToggle caption="Терминал" color="btn-outline-primary" target="#Terminal">	
			<ContainerToggle caption="Терминал" id="Terminal">
				<div id="terminal-container">
					Terminal disconnect
					<Spinner />
				</div>	
			</ContainerToggle>
		</ButtonToggle>
		);

  }
}


// Панель Отладки
class PanelDebug extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
  let id = "offcanvasTop" + this.props.id;
  //let idLabel = "offcanvasTopLabel" + this.props.id;
  //let idSpar = "spar" + this.props.id;
  let IPaddr = "ipaddr" + this.props.id;
  let Status = "status" + this.props.id;
  let Version = "version" + this.props.id;
  
  let link_sync = "http://" + this.props.ipaddr + "/sync.html";
  let link_index = "http://" + this.props.ipaddr + "/index.html";
  let link_ptp = "http://" + this.props.ipaddr + "/ptp" + this.props.PZG_VZG + ".html";
  let link_gnss = "http://" + this.props.ipaddr + "/gnss.html";
  

  let table_style = {width: "600px"};
  
    return (
    

  
  <div className="offcanvas-body">
  
    <ButtonCurlBase caption="Обновить в базе" onClick={this.Click} color="btn-warning" Id={this.props.id} IP={this.props.ipaddr} Cmd="getver" />
    <button type="button" className="btn btn-primary btn-sm add" data-bs-toggle="modal" data-bs-target={"#updateModal" + this.props.id}>Изменить IP-адрес</button>
    <button type="button" className="btn btn-danger btns btn-sm add" data-bs-toggle="modal" data-bs-target={"#deleteModal" + this.props.id}>Удалить</button>
  
  <div className="d-flex">
  <div>
{/*  
  <div id="mesg{{ .Id }}" style="margin-right: 10px; line-height: 2">
        gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg> &nbsp; 
    	ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>
  </div>
    
  */}  
    <table className="table table-dark table-sm" style={table_style}>
    <thead>

      <tr>
        <td><label for="message-text" className="col-form-label">IP-адрес:</label></td>
        <td><label id={IPaddr} for="message-text" className="col-form-label"></label></td>
      </tr>
      <tr>
        <td><label for="message-text" className="col-form-label">Режим:</label></td>
        <td><label id={Status} for="message-text" className="col-form-label"></label></td>
      </tr>
      <tr>
        <td><label for="message-text" className="col-form-label">Версия прошивки:</label></td>
        <td><label id={Version} for="message-text" className="col-form-label"></label></td>
      </tr>
      </thead>
  

  </table>
 </div>

<div className="d-grid col-1">
		<ButtonLink caption="Menu" color="btn-dark" href={link_index} />
		<ButtonLink caption="Sync" color="btn-dark" href={link_sync} />
		<ButtonLink caption="PTP" color="btn-dark" href={link_ptp} />
		<ButtonLink caption="GNSS" color="btn-dark" href={link_gnss} />
</div>

</div>

  
  <div className="d-flex">
  <table>
      <tr>
        <td><textarea rows="25" cols="80" className="usage" id={"spar" + this.props.id}></textarea></td>
      </tr>
  </table>
  
 
  
  <div className="d-grid col-2">
  	<ButtonCurl caption="GNSS" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getgnss" />
	<ButtonCurl caption="Состояние приемника" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="stgpsmon" />
	<ButtonCurl caption="Версия и параметры названия" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getver" />
	<ButtonCurl caption="Настройки сети" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getconfig" />
	<ButtonCurl caption="МАС-адрес и серийный номер" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getmac" />
	<ButtonCurl caption="Конфигурация синхронизации" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getsync" />
 	<ButtonCurl caption="Конфигурация PTP" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getptp" />
 	<ButtonCurl caption="Данные состояния PTP" onClick={this.Click} color="btn-outline-primary" Id={this.props.id} IP={this.props.ipaddr} Cmd="getptpdata" /> 
  </div>
  
  </div>
  
   
 </div>
  

 



    );
  }
}



// Таблица устройств 
class TableDevices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,      
    };
    
  }
  
  
  componentDidMount() {

  }
  
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  
  componentWillMount() {				
    fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=get_dev " + this.props.curPage +  " " + this.props.count)
      .then(res => res.json())
      .then(
        (result) => {
        	console.log("Load False");
        	
        	this.setState({isLoading: false});
        
        	let items = [...this.state.items];
        	if(result){
  			result.forEach(function (item, i) {
				items.push(result[i]);
				this.setState({ items: items });	
  			}.bind(this));
  			
  			//Перебор массива
				result.forEach(function(item, i, arr) {
					console.log(item.IPaddr);
  					reqStatusGNSS_PTP(item.IPaddr, item.Id);
				});
  			
  			// Запрос статуса GNSS/PTP каждый 15 сек		
			this.timerID = setInterval(function() {
				//Перебор массива
				result.forEach(function(item, i, arr) {
					console.log(item.IPaddr);
  					reqStatusGNSS_PTP(item.IPaddr, item.Id);
				});
			}, 15000);
  		}
  			this.setState({isLoading: true});
  			console.log("Load True");
 
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({name: "Error: No message from server"});
        }
      )  
  }

  render() {
  	var tbody_style = {borderTop: 0};
  	var PZG_VZG_style = {textTransform : "uppercase"};
  	
  	let listGNSS;
  	let listPTP;
  	

         return (   <div> 
         {/*<select className="form-select form-select-sm" aria-label=".form-select-sm пример">
  			<option selected>5</option>
  			<option value="5">5</option>
  			<option value="10">10</option>
  			<option value="15">15</option>
  			<option value="20">20</option>
		</select>*/}

         {this.state.isLoading ? [ 
<table className="table table-bordered table-dark table-page">
<thead>
  <tr>
    {/*<th scope="col">gnss/ptp</th>*/}
    <th scope="col">Режим</th>
    <th scope="col">Название</th>
    <th scope="col">gnss ref</th>
    <th scope="col">ptp ref</th>
    <th scope="col">IP адрес</th>
    <th scope="col">Версия</th>
    <th scope="col"></th>
  </tr>
</thead>
  
  <tbody style={tbody_style}>
  {this.state.items.map(item => (

            <tr>
            {/*<td width="50px"><div id={item["Id"]}>{
            item["GNSS"] ?  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg> :
     	 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>
            } / {
            item["PTP"] ?  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg> :
     	 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>
            }</div></td>*/} 
  			<td style={PZG_VZG_style} width="50px">{item["PZG_VZG"]}</td>
    		<td className="name">{item["Name"]}</td>
    		<td>
    			<SevenSeg id={"seven-seg-array-gnss_ref"+item["Id"]} />
    		</td>
    		<td>
    			<SevenSeg id={"seven-seg-array-ptp_ref"+item["Id"]} />
    		</td>
    		<td className="ipaddr" width="70px">{item["IPaddr"]}</td>
			<td className="version" width="170px">{item["Version"]}</td>
			
			<td class="flex">
				<ButtonModal caption="Menu" color="btn-warning" target={"#ToggleMenu"+ item["Id"]}>	
					<ContainerModal caption={"Menu IP: " + item["IPaddr"]} id={"ToggleMenu"+ item["Id"]}>
						<Frame src={"http://" + item["IPaddr"] + "/index.html"} / >
					</ContainerModal>
				</ButtonModal>
				<ButtonModal caption="Sync" color="btn-outline-warning" target={"#ToggleSync"+ item["Id"]}>	
					<ContainerModal caption={"Sync IP: " + item["IPaddr"]} id={"ToggleSync"+ item["Id"]}>
						<Frame src={"http://" + item["IPaddr"] + "/sync.html"} / >
					</ContainerModal>
				</ButtonModal>
				<ButtonModal caption="PTP" color="btn-outline-warning" target={"#TogglePTP"+ item["Id"]}>	
					<ContainerModal caption={"PTP IP: " + item["IPaddr"]} id={"TogglePTP"+ item["Id"]}>
						<Frame src={"http://" + item["IPaddr"] + "/ptp" + item["PZG_VZG"] + ".html"} / >
					</ContainerModal>
				</ButtonModal>
				<ButtonModal caption="GNSS" color="btn-outline-warning" target={"#ToggleGNSS"+ item["Id"]}>	
					<ContainerModal caption={"GNSS IP: " + item["IPaddr"]} id={"ToggleGNSS"+ item["Id"]}>
						<Frame src={"http://" + item["IPaddr"] + "/gnss.html"} / >
					</ContainerModal>
				</ButtonModal>
				
				{/*<ButtonLink caption="Menu" color="btn-warning" href={"http://" + item["IPaddr"] + "/index.html"} />
				<ButtonLink caption="Sync" color="btn-outline-warning" href={"http://" + item["IPaddr"] + "/sync.html"} />
				<ButtonLink caption="PTP" color="btn-outline-warning" href={"http://" + item["IPaddr"] + "/ptp" + item["PZG_VZG"] + ".html"} />
				<ButtonLink caption="GNSS" color="btn-outline-warning" href={"http://" + item["IPaddr"] + "/gnss.html"} />*/}

		
				<ButtonModalDebug caption="Debug" color="btn-outline-primary" target={"#debugpanel" + item["Id"]} Id={item["Id"]} IP={item["IPaddr"]} >
					<ContainerModal caption={item["Name"]} id={"debugpanel" + item["Id"]} max_width="1000px" background_color="#333741">
						<PanelDebug id={item["Id"]} ipaddr={item["IPaddr"]} name={item["Name"]} PZG_VZG={item["PZG_VZG"]} />	
					</ContainerModal>
				</ButtonModalDebug>

				<ContainerModal caption="Удалить устройство?" id={"deleteModal" + item["Id"]} max_width="500px">
 	 				<FormDelDevice id={item["Id"]} name={item["Name"]} delFunc={this.props.delFunc}/> 
 	 			</ContainerModal>
				
				<ContainerModal caption="Изменить IP-адрес" id={"updateModal" + item["Id"]} max_width="500px">
 	 				<FormUpdateDevice id={item["Id"]} name={item["Name"]} ipaddr={item["IPaddr"]} updFunc={this.props.updFunc}/> 
 	 			</ContainerModal>
			</td>
		</tr>      
  ))}
  </tbody>
</table>, <Pagination next={this.props.next} prev={this.props.prev} curPage={this.props.curPage}/> ] : <Spinner />}
</div>
		);
  }
}



// Таблица пользователей 
class TableUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false
    };
  }
  
  
  componentWillMount() {				
    fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=get_usr " + this.props.curPage +  " " + this.props.count)
      .then(res => res.json())
      .then(
        (result) => {
        	this.setState({isLoading: false});
        	let items = [...this.state.items];
        	if(result){
  			result.forEach(function (item, i) {
				items.push(result[i]);
				this.setState({ items: items });
  			}.bind(this));
  			}
  			this.setState({isLoading: true});
 
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({name: "Error: No message from server"});
        }
      )
  }

  render() {
  	var tbody_style = {borderTop: 0};
  	

         return (   <div>
         {this.state.isLoading ? [   
<table className="table table-bordered table-dark table-page">
<thead>
	<tr>
    	<th scope="col">id</th>
		<th scope="col">Имя пользователя</th>
		<th scope="col">Логин</th>
    	<th scope="col">Пароль</th>
    	<th scope="col">Роль</th>
		<th scope="col"></th>
  	</tr>
</thead>
  
  <tbody style={tbody_style}>
  {this.state.items.map(item => (

            <tr>
                <td>{item["Id"]}</td> 
  		<td>{item["UserName"]}</td>
    		<td>{item["Login"]}</td>
    		<td>{item["Pswd"]}</td>
    		<td>{item["UserRole"]}</td>
    		
			
	 <td class="flex">
	 <ContainerModal caption="Удалить пользователя?" id={"deleteModal" + item["Id"]} max_width="500px">
 	 	<FormDelUser id={item["Id"]} name={item["UserName"]} delFunc={this.props.delFunc}/> 
 	 </ContainerModal>
 	 			
 	 <button type="button" className="btn btn-primary btns btn-sm add" data-bs-toggle="modal" data-bs-target={"#updateModal" + item["Id"]}>Изменить</button>
 	 
 	 <ContainerModal caption="Изменить пользователя" id={"updateModal" + item["Id"]} max_width="500px">
 	 	<FormUpdateUser id={item["Id"]} name={item["UserName"]} login={item["Login"]} password={item["Pswd"]} role={item["UserRole"]}updFunc={this.props.updFunc}/> 
 	 </ContainerModal>
 	 			
    	 <button type="button" className="btn btn-danger btns btn-sm add" data-bs-toggle="modal" data-bs-target={"#deleteModal" + item["Id"]}>Удалить</button>
	 </td>
</tr>      
  ))}
  </tbody>
</table>, <Pagination next={this.props.next} prev={this.props.prev} curPage={this.props.curPage}/> ] : <Spinner />}
</div>
		);
  }
}



// Таблица событий 
class TableEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false
    };
  }
  
  
  componentWillMount() {				
    fetch(Protocol+"//"+Host+":"+Port+"/api?cmd=get_evnt " + this.props.curPage +  " " + this.props.count)
      .then(res => res.json())
      .then(
        (result) => {
        	this.setState({isLoading: false});
        	let items = [...this.state.items];
        	if(result){
  			result.forEach(function (item, i) {
				items.push(result[i]);
				this.setState({ items: items });
  			}.bind(this));
  			}
  			this.setState({isLoading: true});
 
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({name: "Error: No message from server"});
        }
      )
  }

  render() {
  	var tbody_style = {borderTop: 0};
 	

         return (   <div>
         {this.state.isLoading ? [   
<table className="table table-bordered table-dark table-page">
<thead>
	<tr>
    	<th scope="col">id</th>
		<th scope="col">Время события</th>
		<th scope="col">Объект</th>
    	<th scope="col">Тип события</th>
    	<th scope="col">Источник</th>
		<th scope="col">Идентификатор события</th>
		<th scope="col">Детали</th>
		<th scope="col">Просмотрено</th>
		<th scope="col"></th>
  	</tr>
</thead>
  
  <tbody style={tbody_style}>
  {this.state.items.map(item => (

            <tr>
            	<td>{item["Id"]}</td> 
  		<td>{item["Time"]}</td>
    		<td>{item["Obj_id"]}</td>
    		<td>{item["Level"]}</td>
    		<td>{item["Source"]}</td>
    		<td>{item["Event"]}</td>
    		<td>{item["Body"]}</td>
    		<td>{item["Is_checked"]}</td>
    		
			
	<td class="flex">
	<ContainerModal caption="Удалить событие?" id={"deleteModal" + item["Id"]} max_width="500px">
 	 	<FormDelEvent id={item["Id"]} name={item["Obj_id"]} delFunc={this.props.delFunc}/> 
 	 </ContainerModal>
 	 			
 	 <button type="button" className="btn btn-primary btns btn-sm add" data-bs-toggle="modal" data-bs-target={"#updateModal" + item["Id"]}>Изменить</button>
 	 
 	 <ContainerModal caption="Изменить событие" id={"updateModal" + item["Id"]} max_width="500px">
 	 	<FormUpdateEvent id={item["Id"]} object={item["Obj_id"]} level={item["Level"]} source={item["Source"]} event={item["Event"]} body={item["Body"]}  is_checked={item["Is_checked"]} updFunc={this.props.updFunc}/> 
 	 </ContainerModal>
 	 			
    	 <button type="button" className="btn btn-danger btns btn-sm add" data-bs-toggle="modal" data-bs-target={"#deleteModal" + item["Id"]}>Удалить</button>
	</td>
</tr>      
  ))}
  </tbody>
</table>, <Pagination next={this.props.next} prev={this.props.prev} curPage={this.props.curPage}/> ] : <Spinner />}
</div>
		);
  }
}

