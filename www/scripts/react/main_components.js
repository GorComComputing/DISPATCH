'use strict';


// Главный компонент
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
        return ([
        <NavBar />,
        <ReactRouterDOM.HashRouter>
		<Route path="/" exact component={Devices_page} />	
          	<Route path="/events"  component={Events_page} />
          	{/*<Route path="/devices" component={Devices_page} />*/}
          	<Route path="/users" component={Users_page} />
          	<Route path="/test"  component={Test_page} />
	</ReactRouterDOM.HashRouter>
	]);

  }
}

