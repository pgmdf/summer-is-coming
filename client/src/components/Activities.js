import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Activities extends Component {

  state = {
    activitiesArr: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/activities').then((response) => {
        this.setState({
            activitiesArr: response.data,
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

    let imgUrl = "http://10kbrew.com/wp-content/uploads/2019/02/giphy.gif"

    return (
      <div>
        <Container>
          <Row>
            <Col>
            {this.state.activitiesArr.length > 0 ?
                            this.state.activitiesArr.map(activity =>
                                <Link to={"/activities/" + activity._id} key={activity._id}>
                                <Row className="mb-4">
                                    <Col xs={3} className="to-the-right"><img src={activity.pictureUrl} alt={activity.name} className="img-fluid img-max-width" /></Col>
                                    <Col xs={9}>
                                        <h2>{activity.title}</h2>
                                    </Col>
                                    </Row>
                                    <hr></hr>
                                </Link>
                            ) :
                            <img src={imgUrl} alt="Draft activity like Homer"></img>
                        }</Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default Activities;