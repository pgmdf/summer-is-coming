import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faClipboard as farClipboard } from '@fortawesome/free-regular-svg-icons';

// TODO: find a way to convert timestamp to readable date

class ActivityDetail extends Component {

  state = {
    activity: null,
    loading: true,
    user: null,
    myFavoriteActivitiesArr: this.props.loggedInUser ? this.props.loggedInUser.myFavoriteActivities : "",
    myInterestsArr: this.props.loggedInUser ? this.props.loggedInUser.myInterests : "",
    myBucketlistArr: this.props.loggedInUser ? this.props.loggedInUser.myBucketlist : ""
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

    axios.put('/activities/' + this.props.match.params.identifier, { myFavoriteActivitiesArr, myBucketlistArr: this.state.myBucketlistArr }).then(() => {
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
      return this.props.match.params.identifier !== id
    })

    axios.put('/activities/' + this.props.match.params.identifier, { myFavoriteActivitiesArr, myBucketlistArr: this.state.myBucketlistArr }).then(() => {
      this.setState({
        myFavoriteActivitiesArr: myFavoriteActivitiesArr
      })
    })
  }

  // add that activity to user's bucketlist
  updateUserBucketlistAddHandler = (event) => {
    event.preventDefault()

    let myBucketlistArr = this.state.myBucketlistArr
    myBucketlistArr.push(this.props.match.params.identifier)

    axios.put('/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
      this.setState({
        myBucketlistArr: myBucketlistArr
      })
    })
  }

  // remove that activity from user's bucketlist
  updateUserBucketlistRemoveHandler = (event) => {
    event.preventDefault()

    let myBucketlistArr = this.state.myBucketlistArr
    myBucketlistArr = myBucketlistArr.filter((id) => {
      return this.props.match.params.identifier !== id
    })

    axios.put('/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
      this.setState({
        myBucketlistArr: myBucketlistArr
      })
    })
  }

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
            <Col xs={12} sm={6}><p>Tags: <strong>{this.state.activity.tags.map(tags => <li key={tags}>{tags}</li>)}</strong></p>
              <p>Location: {this.state.activity.location}<br />
              {/* //TODO: finish #rating in beta-version 
              Rating: {this.state.activity.rating} <FontAwesomeIcon icon={faCoffee} /></p>
              <p> */}Description: {this.state.activity.description}</p>

              <div>{this.props.loggedInUser ?
                <p>{this.state.myFavoriteActivitiesArr.includes(this.state.activity._id) ?
                  <Button variant="danger" onClick={this.updateUserFavoritesRemoveHandler}>
                    <FontAwesomeIcon icon={faStar} size={"2x"} style={{ color: "#FFF" }} /> Remove from favorites</Button>
                  : <Button variant="success" onClick={this.updateUserFavoritesAddHandler}><FontAwesomeIcon icon={farStar} size={"2x"} style={{ color: "#FFF" }} /> Mark as favorite</Button>}</p>
                : null}
              </div>

              <div>{this.props.loggedInUser ?
                <p>{this.state.myBucketlistArr.includes(this.state.activity._id) ?
                  <Button variant="danger" onClick={this.updateUserBucketlistRemoveHandler}><FontAwesomeIcon icon={faClipboard} size={"2x"} style={{ color: "#FFF" }} /> Remove from my bucket list</Button>
                  : <Button variant="success" onClick={this.updateUserBucketlistAddHandler}><FontAwesomeIcon icon={farClipboard} size={"2x"} style={{ color: "#FFF" }} /> Add to my bucket list</Button>}</p>
                : null}
              </div>
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
                    <Card.Body>{this.state.activity.comments.length > 0 ? this.state.activity.comments.map((comment, key) => <li key={key}>{comment}</li>) : <p>No comments yet. Be the first to <Link to={'/activities/' + `${this.props.match.params.identifier}` + '/comment'}>write a comment!</Link></p>}</Card.Body>
                  </Accordion.Collapse>
                </Card>
                {/* TODO: finish #completedby in beta-version
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Who joined that activity?
                  </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>{this.state.activity.completedBy}</Card.Body>
                  </Accordion.Collapse>
                </Card> */}
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Many thanks to <Link to={'/user/'+this.state.activity.createdBy._id}> {this.state.activity.createdBy.username} </Link>, who added this activity on {this.state.activity.timeStamp} to our portfolio!</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/activities">Go back to all activities</Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default withRouter (ActivityDetail);