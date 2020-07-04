import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import axios from 'axios'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, FormControl, Container, Row, Col } from 'react-bootstrap';


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
            <Container className="Signup">
            <Row>
            <Col>



        { this.state.redirect ? <Redirect to="/" /> : null}

        {/* old form  */}
        {/* <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>E-Mail:</label>
          <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Signup" />
        </form> */}

{/* new bootstrap code */}
        <Form onSubmit={this.handleFormSubmit}>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} placeholder="Enter username" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" value={this.state.email} onChange={e=> this.handleChange(e)} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" value={this.state.password} onChange={e=> this.handleChange(e)} placeholder="Password" />
  </Form.Group>

  {/* <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

        <p>Already have account?
            <Link to={"/login"}> Login</Link>
        </p>

</Col>
</Row>
 </Container>
      </div>
     
     
     
     
     
     
     )
  }
}

export default Signup;
