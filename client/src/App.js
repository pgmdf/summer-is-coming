import React, { Component }  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './components/auth/Signup';
import ActivityDetail from './components/ActivityDetail';
import Activities from './components/Activities';
import Navigation from './components/Navigation';
import { Switch, Route } from 'react-router-dom';



class App extends Component {



  render() {
    return (
      <div className="App">
  <Navigation></Navigation>
    <Switch>
    <Route exact path="/signup" component={Signup}/>
    <Route path="/activities" component={Activities}/>
    </Switch>
    </div>
    )
    }
}



export default App;
