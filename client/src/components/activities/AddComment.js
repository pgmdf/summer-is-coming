import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


class AddComment extends Component {

  state = {
    activity: null,
    loading: true
  }

  componentDidMount() {
    axios.get('/api/activities/' + this.props.match.params.identifier + '/comment').then((response) => {
      this.setState({
        activity: response.data,
        loading: false
      })
    })
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    axios.put('/api/activities/' + this.props.match.params.identifier + '/comment', this.state).then((response) => {
      this.props.history.push('/activities/' + this.props.match.params.identifier);
      })
  };

  changeHandler = (event) => {
    let currentInputValue = event.target.value;
    let inputName = event.target.name;
    this.setState({
      [inputName]: currentInputValue,
    });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }

    return (
      <div>
        <Container>
          <Row>
            <Col> 
            <h1>{this.state.activity.title}</h1>
            </Col>
          </Row>
          <Row>
              <Col>
              <Form onSubmit={this.formSubmitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Your comment</Form.Label>
            <Form.Control
              as="textarea" rows="3"
              placeholder="Enter your comment"
              name="comments"
              value={this.state.comments}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit comment
          </Button>

        </Form>
              </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default withRouter(AddComment);