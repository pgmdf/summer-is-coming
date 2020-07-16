import React, { Component } from 'react';
import axios from 'axios';
import interests from '../configs/interests';
import { Redirect } from 'react-router-dom'

class Editprofile extends Component {

  state = {
    username: this.props.userInSession.username,
    email: this.props.userInSession.email,
    password: this.props.userInSession.password,
    profilePicUrl: this.props.userInSession.profilePicUrl,
    myFavoriteActivities: this.props.userInSession.myFavoriteActivities,
    myInterests: this.props.userInSession.myInterests || [],
    loading: false,
    redirect: false
  }


  // you can use for every input field change
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCheckbox = (event) => {
    const checked = event.target.checked
    const interestName = event.target.name

    let newArr;
    if (checked) {
      newArr = this.state.myInterests.concat(interestName)
    } else {
      newArr = this.state.myInterests.filter(i => i !== interestName)
    }

    this.setState({
      myInterests: newArr
    })
  }

  submitHandler = () => {
    axios.put('/api/editprofile', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      myFavoriteActivities: this.state.myFavoriteActivities,
      myInterests: this.state.myInterests
    }).then((resp) => {
      console.log('Updated data', resp.data)
      this.setState({
        redirect: true
      })
    })
  }

  //cloudinary setup

  handleFileUpload = (e) => {
    this.setState({
      loading: true,
    })

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    axios.put('/api/image', uploadData).then((resp) => {

      this.setState({
        loading: false,
        profilePicUrl: resp.data.image_url
      })
      console.log("profilePicUrl" + resp.data.image_url)
    })

  }

  render() {
    // cloudinary pic spinner  
    let spinner = "";
    if (this.state.loading === true) {
      this.setState.profilePicUrl = "https://cdn.lowgif.com/full/ff8280aafe27319d-ajax-loading-gif-transparent-background-2-gif-images.gif";

    } else { };
    // console.log(this.props.userInSession.profilePicUrl)

    return (

      <div>
        {this.state.redirect ? <Redirect to="/userprofile"></Redirect>: ""}
        <h3>Edit my profile</h3>
        <h5><label for="username">Username:</label></h5>
        <input id="username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

        <h5><label for="email">E-Mail:</label></h5>
        <input id="email" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

        <h5><label for="password">Password:</label></h5>
        <input id="password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        <br></br>
        {spinner}

        <img src={this.state.profilePicUrl} height="100px" width="100px" alt="profile pic"></img>
        <input
          type="file"
          onChange={this.handleFileUpload} />


        {/* interests*/}

        <h5><label for="interests">Choose your favourite interests:</label></h5>

        <ul id="edit-interests" name="interests">
          {interests.map(i => (
            <li>
              <input type="checkbox" id={i} name={i} checked={this.state.myInterests.includes(i)} onChange={this.handleCheckbox} />
              <label for={i}>{i}</label>
            </li>
          ))
          }
         </ul>

        

        <button onClick={this.submitHandler}>Save</button>

      </div>


    )
  }

}

export default Editprofile;