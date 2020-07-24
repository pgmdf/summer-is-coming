import React, { Component } from 'react'
import axios from 'axios';
import { Container, Row, Col} from 'react-bootstrap'
import './../App.css';
import { Link } from 'react-router-dom';



export class ActivityInterestMatch extends Component {

    state = {
        userInterestsArr: this.props.loggedInUser.myInterests,
        activitiesArr: [],
        userName: this.props.loggedInUser.username
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


        this.state.userInterestsArr.forEach((interest, index) => {
            customActivitiesArr[index] = this.state.activitiesArr.filter(activity => activity.tags.includes(interest))
        })

        customActivitiesArr.forEach(activity => {
            interestsActivitiesArr.push(...activity)
        })

        console.log('customActivitiesArr', customActivitiesArr)
        // This is the actual activities array fitting to the user's interest: interestsActivitiesArr
        console.log('interestsActivitiesArr', interestsActivitiesArr)
        console.log('userInterestArr', this.state.userInterestsArr)

        if (interestsActivitiesArr.length > 0) {
            console.log('interestsActivitiesArr.title', interestsActivitiesArr[0].title)
        } else {
            return <div></div>
        }

        console.log('DataInterest',interestsActivitiesArr[0].tags)



        return (

            <div>
                <h3 id="activity-hello">Hello {this.state.userName}</h3>
                <h1>Suggested activities according to your interests</h1>

                <Container id="activity-interest-match-card">
                                <Row>
                        {interestsActivitiesArr.map(interest => {
                            return (
                                <Col xs={12} sm={6} md={6} lg={4}>
                                <div>
                                    <Link to={"/activities/" + interest._id} key={interest._id}>

                                        <div className="activity-card">
                                            <div className="img-div"><img className="activity-img" src={interest.pictureUrl} alt={interest.name}></img></div>
                                            <div className="text-div">

                                            <div> 
                                                {interest.tags.map(tag => {
                                                    return (
                                                        <span id="interest-tag">{tag}</span>
                                                    )
                                            })}
                                                </div> 

                                                <h5>{interest.title}</h5>

                                                {/* <p>{interest.description}</p> */}
                                                <p>{interest.location}</p>
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

export default ActivityInterestMatch

