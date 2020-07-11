import React, { Component, Link, imgUrl } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from "axios";



class Userprofile extends Component {
  state = {
    loading: true,
    login: this.props.userInSession,
    username: this.props.userInSession.username,
    profilePicUrl: this.props.userInSession.profilePicUrl,
    myInterests: this.props.userInSession.myInterests,
    myFavoriteActivities: this.props.userInSession.myFavoriteActivities,
    created: this.props.id,
    myBucketlist: this.props.userInSession.myBucketlist
  };

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  /* 
    componentDidMount() {
      axios.get('/user/' + this.props.userID).then(() => {response.data in state})
    }
    backend route für user aus datenbank suchen und widergeben */

  /*   componentDidMount() {
      axios.get('/user/' + this.props.userID).then((response) => {
        this.setState({
          login: response.data,
          loading: false
        })
      })
    } */

  render() {
    /*     if (this.state.loading) {
          return <div>Loading…</div>
        } */
    return (
      <div>
        {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href="/editprofile"> edit my profile </Nav.Link>}

        {/* // ERROR MESSAGE IF USER IS NOT LOGGED IN // */}
        {/* {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null} */}

        <Card border="dark">
          <Card.Header>

            <div id="profileimage">  <Image src="https://ksb-friesland.de/wp-content/uploads/2017/05/profile-default.jpg" width="171px" height="180px" alt="profile-pic" thumbnail /> </div>
            {/*           correct image URL: Replace!!! src={this.state.image_url} */}

            <div>
              <Card.Title> {this.state.username}'s Profile </Card.Title>
              <div>
                Name: {this.state.username} <br />
               Member since: {this.state.created}
                {/* find out how to show the date in pretty with .timeStamp */}

                {/* NUR darstellen, wenn es das Profile von einem selbst ist:
                <h5>E-Mail: {this.props.userInSession.email}</h5> */}

              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div>
              <Card.Title>My Interests</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.myInterests.map(i => <li key={i.this.state.myInterests}></li>)}
                </ul>

              </Card.Text>
            </div>

            <div>
              <Card.Title>My Favorite Activities</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.myFavoriteActivities.map(a => <li key={a.this.state.myFavoriteActivities}></li>)}
                </ul>
              </Card.Text>
            </div>

            {/*             <div>
              <Card.Title>My Bucket List</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.myBucketlist.map(bucket => <li key={bucket.this.state.myBucketlist}></li>)}
                </ul>
              </Card.Text>
            </div> */}

          </Card.Body>
        </Card>
        <br />

      </div>
    );
  }
}

export default Userprofile;
