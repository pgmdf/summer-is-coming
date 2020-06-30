import React, { Component } from 'react';
//import axios from 'axios';

class Activity extends Component {

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
        I'm the activity component
      </div>
    )
  }

}

export default Activity;