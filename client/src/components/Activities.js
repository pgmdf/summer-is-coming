import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import './../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActivityAdd from './ActivityAdd';
import ActivityInterestMatch from './ActivityInterestMatch'
import interests from '../configs/interests';


class Activities extends Component {

  state = {
    activitiesArr: [],
    loading: true,
    value: null,
  }




  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }


  componentDidMount() {
    axios.get('/api/activities').then((response) => {
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

    let filteredArray = this.state.activitiesArr
    if (this.state.value) {
      filteredArray = this.state.activitiesArr.filter(a => a.tags.includes(this.state.value))
    }

    return (
      <div>

        {(this.props.loggedInUser) ? <ActivityInterestMatch loggedInUser={this.props.loggedInUser} /> : ""}


        {(this.props.loggedInUser) ? <div id="discovery-page">
          <a href="activities/discovery">
            <h1>Try something new today</h1>
            <p>Click here to see extraordinary things to do, not fitting your interests</p>
          </a>
        </div> : ""
        }


        <h2>Explore all activities </h2>
        {/* Filter */}

        <h2>Filter down to your interests:</h2>
        <div class="filter-body">
          <form>
            <label for="interests">Interests
            <select value={this.state.value} onChange={this.handleChange} id="interests" name="interests">

                {interests.map(i => (
                  <option value={i}>{i} </option>
                ))
                }
              </select>
            </label>
          </form>
        </div>


        <Row>
          <Col>
            {(this.state.activityAddForm && this.props.loggedInUser) ? <ActivityAdd addActivityCallback={this.addActivityHandler}></ActivityAdd> : this.props.loggedInUser && <Button className="button mb-3" onClick={this.toggleForm}>Wanna add an activity?</Button>}

            {filteredArray.length > 0 ?
              filteredArray.map(activity =>
                <Link to={"/activities/" + activity._id} key={activity._id}>
                  <Row className="mb-4">
                    <Col xs={3} className="to-the-right"><img src={activity.pictureUrl} alt={activity.name} className="img-fluid img-max-width" /></Col>
                    <Col xs={9}>
                      <h2>{activity.title}</h2>
                      <h3>Tags:</h3>
                      <h3>{activity.tags.map(tags => <li key={tags} className="no-bullets">{tags}</li>)}</h3>
                      <h3>{activity.location}</h3>
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