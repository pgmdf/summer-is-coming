import React, { Component, Link, imgUrl } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav, Row, Col } from 'react-bootstrap';
import axios from "axios";



class Userprofile extends Component {
  state = {
    activity: null,
    loading: true,
    username: this.props.userInSession.username,
    profilePicUrl: this.props.userInSession.profilePicUrl,
    myFavoriteActivitiesArr: this.props.userInSession.myFavoriteActivities,
    myInterestsArr: this.props.userInSession.myInterests,
    myBucketlistArr: this.props.userInSession.myBucketlist,
    created: this.props.userInSession.created
  };


  /* For later: as soon as change /userprofile route in App and navigation 
    also change auth routes from userprofile into user/:userID 

    // ruff try //
    componentDidMount() {
      axios.get('/user/' + this.props.userID).then(() => {response.data in state})
    }
    backend route für user aus datenbank suchen und widergeben */

  /*  /* is it correct like that?
      also change auth routes from userprofile into user/:userID 
  
        componentDidMount() {
          axios.get('/user/:userID/' + this.props.userInSession._id).then((response) => {
            this.setState({
              user: response.data,
              loading: false
            })
          })
        } 
        // END // */

  render() {
    /*         if (this.state.loading) {
              return <div>Loading…</div>
            } */
    return (
      <div>
        {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href="/editprofile"> edit my profile </Nav.Link>}

        {/* // ERROR MESSAGE IF USER IS NOT LOGGED IN // */}
        {/* {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null} */}

        <Card border="dark">
          <Card.Header>

            <div id="profileimage">  <Image src={this.state.profilePicUrl} width="171px" height="180px" alt="profile-pic" thumbnail />
            </div>
            <div>
              <Card.Title> {this.state.username}'s Profile </Card.Title>
              <div>
                Name: {this.state.username} <br />
                Member since: {this.state.created} <br />
                {/* find out how to show the date in pretty with .timeStamp */}
                My Interests: <ul>
                  {this.state.myInterestsArr.map(i => <li key={i.myInterestsArr}> {} </li>)}
                </ul>


                {/* show ONLY if it's ur own profile (like "edit profile")
                <h5>E-Mail: {this.props.userInSession.email}</h5> */}

              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div>
              <Card.Title>My Favorite Activities</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.myFavoriteActivitiesArr.map(fav => <li key={fav.myFavoriteActivitiesArr}> {} </li>)}
                  {/*                   {this.state.myFavoriteActivitiesArr.length > 0 ?
                    this.state.myFavoriteActivitiesArr.map(fav =>
                      <li key={key}> {fav.title}
                      </li>) : No Favorites yet ...} */}
                  {/* {this.props.userInSession.myFavoriteActivities.title} */}
                </ul>
              </Card.Text>
            </div>

            <div>
              <Card.Title>My Bucket List</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.myBucketlistArr.map(bucket => <li key={bucket.myBucketlistArr}> {} </li>)}
                </ul>
              </Card.Text>
            </div>

          </Card.Body>
        </Card>
        <br />

      </div>
    );
  }
}

export default Userprofile;
