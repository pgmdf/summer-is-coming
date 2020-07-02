import React, { Component }  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './components/auth/Signup';
import Userprofile from './components/Userprofile';
import Login from './components/auth/Login';
import Activity from './components/Activity';
import Navigation from './components/Navigation';
import { Switch, Route } from 'react-router-dom';



class App extends Component {



  render() {
    return (
      <div className="App">
  <Navigation></Navigation>
    <Switch>
    <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser}/>}/>
      <Route exact path='/login' render={() => <Login updateUser={this.updateTheUser}/>}/> 
    <Route path="/userprofile" component={Userprofile}/>
    <Route path="/activity" component={Activity}/>   
      <Route path="/activity" component={Activity}/>
    </Switch>
    </div>
    )
    }
}



export default App;
