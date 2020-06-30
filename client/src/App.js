import React, { Component }  from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import { Switch, Route } from 'react-router-dom';



class App extends Component {



  render() {
    return (
      <div className="App">

    <Switch>
    <Route exact path="/signup" component={Signup}/>
    </Switch>
    </div>
    )
    }
}




export default App;
