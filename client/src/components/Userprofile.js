import React, { Component } from 'react';



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
          Hello, I'm ... and this is my profile page!
        </div>
      )
    }
  
  }
  
  export default Userprofile;