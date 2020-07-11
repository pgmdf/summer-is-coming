import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClipboard as farClipboard } from '@fortawesome/free-regular-svg-icons';
// import moment from 'moment';

// TODO: find a way to convert timestamp to readable date
// TODO: tags, comments and users that joined an activity should be stored in an own component  to better list them
// TODO: fix timestamp output with moment
class ActivityDetail extends Component {

  state = {
    activity: null,
    loading: true,
    myFavoriteActivitiesArr: this.props.loggedInUser.myFavoriteActivities,
    myInterestsArr: this.props.loggedInUser.myInterests
  }

  componentDidMount() {
    axios.get('/activities/' + this.props.match.params.identifier).then((response) => {
      this.setState({
        activity: response.data,
        loading: false
      })
    })
  }

  // add that activity to user's array
  updateUserFavoritesAddHandler = (event) => {
    event.preventDefault()

    let myFavoriteActivitiesArr = this.state.myFavoriteActivitiesArr
    myFavoriteActivitiesArr.push(this.props.match.params.identifier)

    axios.put('/activities/' + this.props.match.params.identifier, {myFavoriteActivitiesArr}).then(() => {
      this.setState({
        myFavoriteActivitiesArr: myFavoriteActivitiesArr 
      })
    })
  }

  // remove that activity from user's array
  updateUserFavoritesRemoveHandler = (event) => {
    event.preventDefault()

    let myFavoriteActivitiesArr = this.state.myFavoriteActivitiesArr
    myFavoriteActivitiesArr = myFavoriteActivitiesArr.filter((id) => {
     return this.props.match.params.identifier !== id })

    axios.put('/activities/' + this.props.match.params.identifier, {myFavoriteActivitiesArr}).then(() => {
      this.setState({
        myFavoriteActivitiesArr: myFavoriteActivitiesArr 
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }

    console.log("user_id:" + this.props.loggedInUser.username + this.props.loggedInUser._id)
    console.log("actual myFav-State:" + this.state.myFavoriteActivitiesArr)

    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={6}><h1>{this.state.activity.title}Test</h1>
              <img src={this.state.activity.pictureUrl} alt={this.state.activity.title} className="img-fluid img-max-width" /></Col>
            <Col xs={12} sm={6}><p>Tags: <strong>{this.state.activity.tags.map(tags => <li key={tags}>{tags}</li>)}</strong></p>
              <p>Location: {this.state.activity.location}<br />
              Rating: {this.state.activity.rating} <FontAwesomeIcon icon={faCoffee} /></p>
              <p>Description: {this.state.activity.description}</p>

              <div>{this.props.loggedInUser ? 
                <p>{this.state.myFavoriteActivitiesArr.includes(this.state.activity._id) ? 
                <Button variant="danger" onClick={this.updateUserFavoritesRemoveHandler}>
                <FontAwesomeIcon icon={faStar} size={"2x"} style={{ color: "#FFF" }} /> Remove from favorites</Button> 
                : <Button variant="success" onClick={this.updateUserFavoritesAddHandler}><FontAwesomeIcon icon={farStar} size={"2x"} style={{ color: "#FFF" }} /> Mark as favorite</Button>}</p> 
                : null}</div>

              <p>{this.props.loggedInUser ? <Button><FontAwesomeIcon icon={farClipboard} size={"2x"} style={{ color: "#FFF" }} /> Add to my bucket list</Button> : null}</p>
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
                    <Card.Body>{this.state.activity.comments.length > 0 ? this.state.activity.comments.map((comment, key) => <li key={key}>{comment}</li>) : <p>No comments yet.</p>}</Card.Body>
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
          <Row>
            <Col>
              <p>Many thanks to {this.state.activity.createdBy.username}, who added that activity on {this.state.activity.timeStamp} to our portfolio!</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default withRouter(ActivityDetail);