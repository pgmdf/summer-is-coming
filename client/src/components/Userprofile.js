import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from "axios";
/* import moment */



class Userprofile extends Component {
  state = {
    loading: true,
    user: null,
  };


  componentDidMount() {
    axios.get('/api/user/' + this.props.userID).then((response) => {
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

        <Card border="dark" className="box-white">
          <Card.Header className="back-grey full-width flex-row text-left">
            <div id="profileimage">  <Image src={this.state.user.profilePicUrl} alt="profile-pic" thumbnail />
            </div>
            <div className="margin10">
              <Card.Title> <h3 className="text-bright">{this.state.user.username}'s Profile</h3> </Card.Title>
              <div>
                <div className="bold-head text-bright">Name:</div> {this.state.user.username} <br />
                {/* Living in: <br /> */}
                <div className="bold-head text-bright">Member since:</div> {this.state.user.created.split('T')[0]} <br />
                {/* find out how to show the date in pretty with .timeStamp */}
                <div className="bold-head text-bright">My Interests:</div>
                <ul>
                  {this.state.user.myInterests.length > 0 ? this.state.user.myInterests.map((i, key) => <li key={key} className="inline">{i} / </li>) : "Sorry, I'm not interested :("}
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
                <div>
                  {this.state.user.myFavoriteActivities.length > 0 ? this.state.user.myFavoriteActivities.map((fav, key) =>
                    <Link to={"/activities/" + fav._id} key={fav._id} className="border-bottom"><Image src={fav.pictureUrl} height="35px" />
                      {fav.title}
                    </Link>) : "I don't have any favs yet."}
                </div>
              </Card.Text>
            </div>

            <div>
              <Card.Title><h3>My Bucket List</h3></Card.Title>
              <Card.Text>
                <div>
                  {this.state.user.myBucketlist.length > 0 ? this.state.user.myBucketlist.map((b, key) =>
                    <Link to={"/activities/" + b._id} key={key._id} className="border-bottom"><Image src={b.pictureUrl} height="35px" />
                      {b.title}
                    </Link>) : "I've got nothing to do."}
                </div>
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
