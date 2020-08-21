import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
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
    axios.get('/api/activities/' + this.props.match.params.identifier).then((response) => {
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

    axios.put('/api/activities/' + this.props.match.params.identifier, { myFavoriteActivitiesArr, myBucketlistArr: this.state.myBucketlistArr }).then(() => {
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

    axios.put('/api/activities/' + this.props.match.params.identifier, { myFavoriteActivitiesArr, myBucketlistArr: this.state.myBucketlistArr }).then(() => {
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

    axios.put('/api/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
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

    axios.put('/api/activities/' + this.props.match.params.identifier, { myBucketlistArr, myFavoriteActivitiesArr: this.state.myFavoriteActivitiesArr }).then(() => {
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
            <Col xs={12} sm={6}><h1>{this.state.activity.title}</h1>
            <div id="activ-img">
              <img src={this.state.activity.pictureUrl} alt={this.state.activity.title} className="img-fluid img-max-width" />
              </div></Col>
            <Col xs={12} sm={6}><p>Tags: <strong>{this.state.activity.tags.map(tags => <li key={tags} className="no-bullets">{tags}</li>)}</strong></p>
              <p>Location: {this.state.activity.location}<br />
              {/* //TODO: finish #rating in beta-version 
              Rating: {this.state.activity.rating} <FontAwesomeIcon icon={faCoffee} /></p>
              <p> */}Description: {this.state.activity.description}</p>

              <div>{this.props.loggedInUser ?
                <p>{this.state.myFavoriteActivitiesArr.includes(this.state.activity._id) ?
                  <Button onClick={this.updateUserFavoritesRemoveHandler}>
                    <FontAwesomeIcon icon={faStar} size={"1x"} style={{ color: "#FFF" }} /> Remove from favorites</Button>
                  : <Button onClick={this.updateUserFavoritesAddHandler}><FontAwesomeIcon icon={farStar} size={"1x"} style={{ color: "#FFF" }} /> Mark as favorite</Button>}</p>
                : null}
              </div>

              <div>{this.props.loggedInUser ?
                <p>{this.state.myBucketlistArr.includes(this.state.activity._id) ?
                  <Button onClick={this.updateUserBucketlistRemoveHandler}><FontAwesomeIcon icon={faClipboard} size={"1x"} style={{ color: "#FFF" }} /> Remove from my bucket list</Button>
                  : <Button onClick={this.updateUserBucketlistAddHandler}><FontAwesomeIcon icon={farClipboard} size={"1x"} style={{ color: "#FFF" }} /> Add to my bucket list</Button>}</p>
                : null}
              </div>
              <Accordion className="img-max-width">
                <Card>
                  <Card.Header className="no-bg">
                    <Accordion.Toggle as={Button} eventKey="0" className="img-max-width">
                      Show recent comments
                  </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    {this.state.activity.comments.length > 0 ? this.state.activity.comments.map((comment, key) => <li key={key} className="no-bullets">„{comment}”</li>) : <p>No comments yet. Be the first to <Link to={`/activities/${this.props.match.params.identifier}/comment`}>write a comment!</Link></p>}
                    <br /><Button className="img-max-width"><Link to={`/activities/${this.props.match.params.identifier}/comment`}>Write a comment!</Link></Button></Card.Body>
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
              <p>Many thanks to <Link to={'/user/'+this.state.activity.createdBy._id}> {this.state.activity.createdBy.username} </Link>, who added this activity on {this.state.activity.timeStamp.split('T')[0]} to our portfolio!</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button><Link to="/activities">Go back to all activities</Link></Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default withRouter (ActivityDetail);