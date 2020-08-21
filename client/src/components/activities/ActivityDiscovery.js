import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../../App.css';
// import HorizontalCards from './HorizontalCards';



export class ActivityDiscovery extends Component {

    state = {
        userInterestsArr: this.props.loggedInUser.myInterests,
        activitiesArr: [],
    }

// This is my activities data from the database
componentDidMount() {
    axios.get('/api/activities').then((response) => {
        console.log('Activity data', response.data)
      this.setState({
        activitiesArr: response.data,
      })
    })
  }

    render() {

    let customActivitiesArr = []
    let interestsActivitiesArr = []
    let discoveryArr = []

        
        this.state.userInterestsArr.forEach((interest, index) => {
        customActivitiesArr[index] = this.state.activitiesArr.filter(activity => activity.tags.includes(interest))
        })

        customActivitiesArr.forEach(activity => {
            interestsActivitiesArr.push(...activity)
        })


    // These are all activities
    console.log('activitesArr',this.state.activitiesArr)
     // This is the actual activities array fitting to the user's interest: interestsActivitiesArr
    console.log('interestsActivities', interestsActivitiesArr)
    // This is the discovery activities not matching the interests
    discoveryArr = _.differenceBy(this.state.activitiesArr, interestsActivitiesArr, '_id')
    console.log('discoveryArr', discoveryArr)



        return (
            <div>
                <h1>Extraordinary things to do</h1>
                <h3>Try something new today</h3>
                {/* <HorizontalCards inputArray={discoveryArr}/> */}
                <Container>
                <Row>
                {discoveryArr.map(activity => {
                return (
                    <Col xs={12} sm={6} md={6} lg={4}>
                <div>
                <Link to={"/activities/" + activity._id} >

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


                {/* <div id="interest-tag"> <p>{activity.tags}</p></div> */}

                <h5>{activity.title}</h5>

                {/* <p>{activity.description}</p> */}
                <p>{activity.location}</p>
                </div>
                </div>
                </Link>

                </div>
                </Col>
            )
        })}                
                </Row>
                </Container>
            </div>
        )
    }
}

export default ActivityDiscovery
