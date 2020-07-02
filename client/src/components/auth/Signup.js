import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import axios from 'axios'

class Signup extends Component {
  state = { username: '', password: '', redirect: false }
  

  // handleChange() and handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    axios.post('/api/signup', { username, password })    
      .then(response => {
        this.setState({
          username: "",
          password: "",
          redirect: true
        });
        this.props.updateUser(response)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render(){
    return(
    <div>
        { this.state.redirect ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
            <Link to={"/login"}> Login</Link>
        </p>

      </div>    )
  }
}

export default Signup;
