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
import Home from './components/Home';
import Editprofile from './components/Editprofile';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Mapping from './components/Mapdummy';



class App extends Component {

  state = {
    redirectActivities: false,
    loggedInUser: this.props.user
  }


  updateTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  addActivityHandler = () => {
    this.setState({
      redirectActivities: true
    })
  }

  render() {
    return (

      <div>
        {this.state.redirectActivities ? <Redirect to="/activities"></Redirect> : null}
        <Navigation></Navigation>
        <Container>
          <Switch>
            <Route exact path="/" render={() => <Home userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/activities" render={() => <Activities updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path="/activities/add" render={() => <ActivityAdd addActivityCallback={this.addActivityHandler}></ActivityAdd>} />
            <Route exact path="/activities/:identifier" component={ActivityDetail} />
            <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser} />} />
            <Route exact path='/login' render={() => <Login updateUser={this.updateTheUser} />} />
            <Route exact path="/userprofile" component={Userprofile} />
            <Route exact path="/editprofile" component={Editprofile} />
            <Route exact path="/dummy" component={Dummy} />
            <Route exact path="/mapdummy" component={Mapping} />
          </Switch>
        </Container>
      </div>
    )
  }
}



export default App;
