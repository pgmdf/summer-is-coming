import React, { Component } from 'react';
// import { login } from '../../api'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, FormControl, Container, Row, Col } from 'react-bootstrap';

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
      <Container className="Login">
            <Row>
            <Col>

        { this.state.redirect ? <Redirect to="/" /> : null}
        
        {/* old form */}
        {/* <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input name="password" type="password" value={this.state.password} onChange={ e => this.handleChange(e)} /> 
          
          <input type="submit" value="Login" />
        </form> */}

        {/* new bootstrap form */}

        <Form onSubmit={this.handleFormSubmit}>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} placeholder="Enter username" />
    
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" value={this.state.password}onChange={e=> this.handleChange(e)} placeholder="Password" />
  </Form.Group>

  <Button variant="primary" value="Login" type="submit">
    Submit
  </Button>
</Form>


        <p>Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
</Col>
</Row>
 </Container>
      </div>
    )
  }

}

export default Login;
