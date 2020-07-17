import React, { Component } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from "axios";



class Userprofile extends Component {
  state = {
    activity: null,
    loading: true,
    user: null,
  };


  componentDidMount() {
    axios.get('/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        loading: false
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }
    return (
      <div>
        {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href="/editprofile"> edit my profile </Nav.Link>}

        {/*     Shows the Name of the current user
        {this.state.loading ? "" : this.state.user.username} */}

        {/* // ERROR MESSAGE IF USER IS NOT LOGGED IN // */}
        {/* {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null} */}

        <Card border="dark">
          <Card.Header>
            <div id="profileimage">  <Image src={this.state.user.profilePicUrl} alt="profile-pic" thumbnail />
            </div>
            <div>
              <Card.Title> {this.state.user.username}'s Profile </Card.Title>
              <div>
                Name: {this.state.user.username} <br />
                Living in: <br />
                Member since: {this.state.user.created} <br />
                {/* find out how to show the date in pretty with .timeStamp */}
                My Interests: <ul>
                  {this.state.user.myInterests.length > 0 ? this.state.user.myInterests.map((i, key) => <li key={key}>{i}</li>) : <p>Sorry, I'm not interested :(</p>}
                  {/* {JSON.stringify(this.state.user.myFavoriteActivities, null, 2)} */}
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
                  {this.state.user.myFavoriteActivities.length > 0 ? this.state.user.myFavoriteActivities.map((fav, key) => <li key={key}>{fav}</li>) : <p>I don't have any favs yet.</p>}
                </ul>
              </Card.Text>
            </div>

            <div>
              <Card.Title>My Bucket List</Card.Title>
              <Card.Text>
                <ul>
                  {this.state.user.myBucketlist.length > 0 ? this.state.user.myBucketlist.map((b, key) => <li key={key}>{b}</li>) : <p>I got nothing to do.</p>}
                  {this.state.user.myBucketlist.map(bucket => <li key={bucket.myBucketlistArr}> {} </li>)}
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
