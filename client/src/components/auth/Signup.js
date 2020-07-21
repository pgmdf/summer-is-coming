import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


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
          email: "",
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

  render() {
    return (
      <div>
        <Container id="Signup">
          <Row>
            <Col>

              {/* Here it defines where to redirect after clicking Sign up */}
              {this.state.redirect ? <Redirect to="/confirm-email" /> : null}


              {/* new bootstrap code */}
              <h3>Create a new account</h3>
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} placeholder="Password" />
                </Form.Group>
                <p id="password-txt">Make sure it's at least 8 characters including a number and a lowercase letter.</p>
                <Button variant="primary" type="submit">
                  Sign up
  </Button>
                <br />


                <a href={process.env.REACT_APP_BACKEND_URL + "/api/google"}>
                  <button id="google-btn" className="btn noHover">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" height="18"></img>
                    <span id="google-signup-txt">
                      Sign up with Google</span>
                  </button>
                </a>

              </Form>

              <p>Already have an account?
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
