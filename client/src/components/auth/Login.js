import React, { Component } from 'react';
// import { login } from '../../api'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', redirect: false };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    axios.post('/api/login', { username, password })
        .then( response => {
        this.setState({ 
            username: "", 
            password: "",
            redirect: true
         });
        this.props.updateUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
        { this.state.redirect ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label>Password:</label>

          {/* <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /> */}
          <input name="password" type="password" value={this.state.password} onChange={ e => this.handleChange(e)} /> 
          
          <input type="submit" value="Login" />
        </form>
        <p>Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}

export default Login;
