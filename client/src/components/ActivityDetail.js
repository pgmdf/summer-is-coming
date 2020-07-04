import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';


class ActivityDetail extends Component {

  state = {
    activity: null,
    loading: true
  }

  componentDidMount() {
    axios.get('/activities/' + this.props.match.params.identifier).then((response) => {
      this.setState({
        activity: response.data,
        loading: false
      })
    })
  }

  // you can use for every input field
  /*   handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    } */


  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={6}><h1>{this.state.activity.title}Test</h1>
              <img src={this.state.activity.pictureUrl} alt={this.state.activity.title} className="img-fluid img-max-width" /></Col>
            <Col xs={12} sm={6}><p>Tags: <strong>{this.state.activity.tags}</strong></p>
              <p>Location: {this.state.activity.location}<br />
              Rating: {this.state.activity.rating} </p>
              <p>Description: {this.state.activity.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Show recent comments
      </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>{this.state.activity.comments}</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Who joined that activity?
      </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>{this.state.activity.completedBy}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default ActivityDetail;