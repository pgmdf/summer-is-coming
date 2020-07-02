import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap'

class ActivityDetail extends Component {

  state = {
    loading: true

  }

  componentDidMount() {
    axios.get('https://ih-beers-api2.herokuapp.com/beers/' + this.props.match.params.id).then((response) => {
        this.setState({
            beer: response.data,
            loading: false
        })
    })
}

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }

    return (
      <div>
        <Container>
          <Row>
            <Col><h1>{this.state.title}Test</h1>
              <img src={this.state.pictureUrl} alt={this.state.title} className="img-fluid img-max-width" /></Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default ActivityDetail;