import React, { Component } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap'



class Userprofile extends Component {

  state = {

  }

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div>
      {/* // ERROR MESSAGE IF USER IS NOT LOGGED IN // */}
      {/* {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null} */}
        Hello, I'm {this.state.username} and this is my profile page!
      </div>
    )
  }

}

export default Userprofile;