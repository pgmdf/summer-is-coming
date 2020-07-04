import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import Signup from './components/auth/Signup';
import ActivityDetail from './components/ActivityDetail';
import ActivityAdd from './components/ActivityAdd';
import Activities from './components/Activities';
import Userprofile from './components/Userprofile';
import Login from './components/auth/Login';
import Navigation from './components/Navigation';
import Dummy from './components/Dummy';
import { Switch, Route } from 'react-router-dom';



class App extends Component {



  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/activities/add" component={ActivityAdd} />
          <Route exact path="/activities/:identifier" component={ActivityDetail} />
          <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser} />} />
          <Route exact path='/login' render={() => <Login updateUser={this.updateTheUser} />} />
          <Route path="/userprofile" component={Userprofile} />
          <Route path="/dummy" component={Dummy} />
        </Switch>
      </div>
    )
  }
}



export default App;
