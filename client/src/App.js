import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import Signup from './components/auth/Signup';
import ActivityDetail from './components/activities/ActivityDetail';
import ActivityAdd from './components/activities/ActivityAdd';
import Activities from './components/activities/Activities';
import AddComment from './components/activities/AddComment';
import Userprofile from './components/profile/Userprofile';
import Login from './components/auth/Login';
import Navigation from './components/Navigation';
import Dummy from './components/Dummy';
import Home from './components/Home';
import Editprofile from './components/profile/Editprofile';
import ConfirmEmail from './components/auth/ConfirmEmail';
import ActivityInterestMatch from './components/activities/ActivityInterestMatch';
import ActivityDiscovery from './components/activities/ActivityDiscovery';
import Contact from './components/contact';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Slider from './components/Slider';
import Weather from './components/Weather'


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
        <Navigation user={this.state.loggedInUser} updateUser={this.updateTheUser}></Navigation>
        
        
        <Switch>

        <Container fluid>

          <Route exact path="/" render={() => <Home userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />} />

        </Container>

        
        <Container>

            
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/activities" render={() => <Activities updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path="/activities/discovery" render={() => <ActivityDiscovery updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path="/activities/add" render={() => <ActivityAdd addActivityCallback={this.addActivityHandler}></ActivityAdd>} />
            <Route exact path="/activities/interests" render={() => <ActivityInterestMatch updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path="/activities/:identifier" render={() => <ActivityDetail updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path="/activities/:identifier/comment" render={() => <AddComment updateUser={this.updateTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser} />} />
            <Route exact path='/login' render={() => <Login updateUser={this.updateTheUser} />} />
            <Route exact path='/weather' render={() => <Weather/>} />

            <Route exact path='/contact' render={() => <Contact/>} />
            {/* <Route exact path="/userprofile" render={() => <Userprofile userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />} /> */}
            <Route exact path="/user/:userID" render={(props) => {
              if (this.state.loggedInUser) {
                return <Userprofile userID={props.match.params.userID} userInSession={this.state.loggedInUser} />
              } else {
                return <Redirect to="/login"></Redirect>
              }
            }
            } />
            <Route path="/confirm-email" component={ConfirmEmail} />
            <Route exact path="/editprofile" render={() => <Editprofile userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />} />
            <Route path="/dummy" component={Dummy} />
            <Route exact path="/slider" component={Slider}/>
          
          </Container>
          </Switch>
      </div>
    )
  }
}



export default App;
