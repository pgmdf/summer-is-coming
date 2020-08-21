import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import '../../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActivityAdd from './ActivityAdd';
import ActivityInterestMatch from './ActivityInterestMatch'
import interests from '../../configs/interests';


class Activities extends Component {

  state = {
    activitiesArr: [],
    loading: true,
    value: "",
    userInterestsArr: (this.props.loggedInUser === null) ? "" : this.props.loggedInUser.myInterests
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

  // Adding "All activities" to the filter

  addInterestAll = (interestArray) => {
    let outputArray = interestArray
    if (!interestArray.includes('All')) {
      outputArray.unshift('All')
    }

    return outputArray
  }



  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }

    //let imgUrl = "http://10kbrew.com/wp-content/uploads/2019/02/giphy.gif"

    let filteredArray = this.state.activitiesArr

    if (this.state.value) {

      if (this.state.value !== 'All') {
        filteredArray = this.state.activitiesArr.filter(a => a.tags.includes(this.state.value))
      } else {
        filteredArray = this.state.activitiesArr
      }
      console.log('filteredArray', filteredArray)
    }

    return (
      <div>

        {(this.props.loggedInUser) ? <ActivityInterestMatch loggedInUser={this.props.loggedInUser} /> : ""}


        {(this.props.loggedInUser && this.state.userInterestsArr.length > 0) ? <div id="discovery-page">
          <a href="activities/discovery">
            <h1>Try something new today</h1>
            <p>Click here to get inspired!</p>
          </a>
        </div> : ""
        }


        <h1>Explore all activities </h1>
        {/* Filter */}

        <p>Filter down to your interests:</p>
        <div className="filter-body">
          <form>
            <label form="interests">
              <select value={this.state.value} onChange={this.handleChange} id="interests" name="interests">

                {this.addInterestAll(interests).map(i => (
                  <option value={i} key={i}>{i} </option>
                ))
                }
              </select>
            </label>
          </form>
        </div>


        <Row>

          <Col>
            {(this.state.activityAddForm && this.props.loggedInUser) ? <ActivityAdd addActivityCallback={this.addActivityHandler}></ActivityAdd> : this.props.loggedInUser && <Button className="button mb-3" onClick={this.toggleForm}>Wanna add an activity?</Button>}
          </Col>
        </Row>
        <br />
        <Row>
          {filteredArray.map(activity => {
            return (
              <Col xs={12} sm={6} md={6} lg={4}>

                <div>
                  <Link to={"/activities/" + activity._id} key={activity._id}>

                    <div className="activity-card">
                      <div className="img-div"><img className="activity-img" src={activity.pictureUrl} alt={activity.name}></img></div>
                      <div className="text-div">

                        <div>
                          {activity.tags.map(tag => {
                            return (
                              <span id="interest-tag">{tag}</span>
                            )
                          })}
                        </div>

                        <h5>{activity.title}</h5>

                        {/* <p>{interest.description}</p> */}
                        <p>{activity.location}</p>
                      </div>
                    </div>
                  </Link>

                </div>
              </Col>
            )

          })}
        </Row>


        {/* <Row>
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
        </Row> */}
      </div>
    )
  }

}

export default Activities;