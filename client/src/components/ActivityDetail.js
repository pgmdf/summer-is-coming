import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap'

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
    console.log('here i am')
    return (
      <div>
        <Container>
          <Row>
            <Col><h1>{this.state.activity.title}Test</h1>
              <img src={this.state.activity.pictureUrl} alt={this.state.activity.title} className="img-fluid img-max-width" /></Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default ActivityDetail;