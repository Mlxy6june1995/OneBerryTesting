import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css'; 

//import pages and components
//import LoginPage from './Pages/LoginPage';
import ProcedurePage from './Pages/ProcedurePage';

class App extends Component
{
  render()
  {
    return(
      <>  
      <Router>
        {/*All our Routes goes here!*/}
          <Switch>
            <Route exact path="/" component={ProcedurePage} />
          </Switch>
      </Router>
      </>
    )
  }
}

export default App;
