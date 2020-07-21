import React, { Component } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from "axios";
import Activities from "./Activities";



class Userprofile extends Component {
  state = {
    activity: null,
    loading: true,
    user: null,
  };


  componentDidMount() {
    axios.get('/api/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        activity: response.data,
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

        <Card border="dark" className="box-white">
          <Card.Header className="back-grey full-width flex-row text-left">
            <div id="profileimage">  <Image src={this.state.user.profilePicUrl} alt="profile-pic" thumbnail />
            </div>
            <div className="margin10">
              <Card.Title> <h3 className="text-bright">{this.state.user.username}'s Profile</h3> </Card.Title>
              <div>
                <div className="bold-head text-bright">Name:</div> {this.state.user.username} <br />
                {/* Living in: <br /> */}
                <div className="bold-head text-bright">Member since:</div> {this.state.user.created} <br />
                {/* find out how to show the date in pretty with .timeStamp */}
                <div className="bold-head text-bright">My Interests:</div> 
                <ul className="inline">
                  {this.state.user.myInterests.length > 0 ? this.state.user.myInterests.map((i, key) => <li key={key}>{i} / </li>) : <p>Sorry, I'm not interested :(</p>}
                  {/* {JSON.stringify(this.state.user.myFavoriteActivities, null, 2)} */}
                </ul>


                {/* show ONLY if it's ur own profile (like "edit profile")
                <h5>E-Mail: {this.props.userInSession.email}</h5> */}

              </div>
            </div>
          </Card.Header>

          <Card.Body className="margin0 padding0 center">
            <div>
              <Card.Title><h3>My Favorite Activities</h3></Card.Title>
              <Card.Text>
                <ul>
                  {this.state.user.myFavoriteActivities.length > 0 ? this.state.user.myFavoriteActivities.map((fav, key) => <div className=""><li key={key} className="border-bottom">{fav}</li></div>) : <p>I don't have any favs yet.</p>}
                </ul>
              </Card.Text>
            </div>

            <div>
              <Card.Title><h3>My Bucket List</h3></Card.Title>
              <Card.Text>
                <ul>
                  {this.state.user.myBucketlist.length > 0 ? this.state.user.myBucketlist.map((b, key) => <li key={key} className="border-bottom">{b} </li>) : <p>I got nothing to do.</p>}
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
