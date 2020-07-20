import React, { Component } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from "axios";
import _ from "lodash";



class Userprofile extends Component {
  state = {
    activity: null,
    loading: true,
    user: null,
    allActivities: [],
    bucketListTitles: [],
  };


  componentDidMount() {
    axios.get('/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        loading: false
      })
    });
    axios.get('/activities').then((response) => {
      this.setState({
        allActivities: response.data,
      })
    }).then(() => {
      
      let myBucketlist = this.state.user.myBucketlist;
      let allActivities = this.state.allActivities
      let allActivitiesArr = allActivities.map(x => x._id)

for (let i = 0; i<myBucketlist.length; i++) {
let entryNumber = allActivitiesArr.indexOf(myBucketlist[i]);
let title = allActivities[entryNumber].title;
this.state.bucketListTitles.push(title)

}

    })

  }

  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }
    let allActivities = this.state.allActivities
    let allActivitiesArr = allActivities.map(x => x._id)

    this.state.user.myBucketlist.map((li) => 
    console.log(allActivities[allActivitiesArr.indexOf(li)]) // why is .title undefined but without the dot it is deifned?
    ) 
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
                {this.state.user.myBucketlist.length > 0 ? 

                  this.state.user.myBucketlist.map((li, key) => <li key={key}>{li.title}</li>)
                
                  
                 : <p>I've already done everything in my life.</p>}
                {/* this.state.user.myFavoriteActivities.map((fav, key) => <li key={key}>{fav}</li>) : <p>I don't have any favs yet.</p>} */}
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
