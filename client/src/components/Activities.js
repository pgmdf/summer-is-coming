import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import './../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActivityAdd from './ActivityAdd';

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

  addActivityHandler = (newActivity) => {
    this.setState({
      activitiesArr: this.state.activitiesArr.concat(newActivity),
      // set button back to appear and let form disappear again:
      activityAddForm: false
    })
  }

  // TODO: add if condition for AddActivity to appear on button click
  toggleForm = (event) => {
    this.setState({
      activityAddForm: true
    })
  }


  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }

    let imgUrl = "http://10kbrew.com/wp-content/uploads/2019/02/giphy.gif"

    return (
      <div>
          <Row>
            <Col>
              {(this.state.activityAddForm && this.props.loggedInUser) ? <ActivityAdd addActivityCallback={this.addActivityHandler}></ActivityAdd> : this.props.loggedInUser &&  <Button className="button is-warning mb-3" onClick={this.toggleForm}>Wanna add an activity?</Button>}

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
      </div>
    )
  }

}

export default Activities;