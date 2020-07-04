import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import Signup from './components/auth/Signup';
import ActivityDetail from './components/ActivityDetail';
import Activities from './components/Activities';
import Userprofile from './components/Userprofile';
import Login from './components/auth/Login';
import Activity from './components/Activity';
import Editprofile from './components/Editprofile';
import Navigation from './components/Navigation';
import Dummy from './components/Dummy';
import { Switch, Route } from 'react-router-dom';



class App extends Component {



  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/activities/:identifier" component={ActivityDetail} />
          <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser} />} />
          <Route exact path='/login' render={() => <Login updateUser={this.updateTheUser} />} />
          <Route path="/userprofile" component={Userprofile} />
          <Route path="/dummy" component={Dummy} />
          <Route path="/fileupload" component={Editprofile}/>  
        </Switch>
      </div>

    )
  }
}



export default App;
