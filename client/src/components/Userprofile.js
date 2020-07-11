import React, { Component } from 'react';



class Userprofile extends Component {

  state = {

  }

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    console.log('This is your data:',this.props.userInSession.username)
    return (
      <div className="user-details">
        {/* Hello, I'm {this.props.userInSession.username} and this is my profile page! */}
        <h3>Hello {this.props.userInSession.username}! </h3>
        <h4>This is your profile</h4>

  <h5>Username: {this.props.userInSession.username}</h5>
  <h5>E-Mail: {this.props.userInSession.email}</h5>
  <h5>Profile Pic:</h5>
  <img src={this.props.userInSession.profilePicUrl} width="200px"/>
  <h5>Your favourite activities:</h5>
  <p>{this.props.userInSession.myFavoriteActivities}</p>
  <h5>Your interests:</h5>
  <p>{this.props.userInSession.myInterests}</p>
        
  <a href='/editprofile'> Edit your profile</a>

      </div>
    )
  }

}

export default Userprofile;