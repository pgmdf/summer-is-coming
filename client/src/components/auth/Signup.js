import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import axios from 'axios'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import FormControl from 'react-bootstrap/lib/FormControl';


class Signup extends Component {
  state = { username: '', email: '', password: '', redirect: false }
  

  // handleChange() and handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    axios.post('/api/signup', { username, email, password })    
      .then(response => {
        this.setState({
          username: "",
          email:"",
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





          <label>E-Mail:</label>
          <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
            <Link to={"/login"}> Login</Link>
        </p>

      </div>
     
     
     
     
     
     
     )
  }
}

export default Signup;
