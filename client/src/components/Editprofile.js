import React, { Component } from 'react';
import axios from 'axios';
import interests from '../configs/interests';
import { Redirect, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

class Editprofile extends Component {

  state = {
    username: this.props.userInSession.username,
    email: this.props.userInSession.email,
    password: this.props.userInSession.password,
    profilePicUrl: this.props.userInSession.profilePicUrl,
    myFavoriteActivities: this.props.userInSession.myFavoriteActivities,
    myInterests: this.props.userInSession.myInterests || [],
    loading: false,
    redirect: false,
    user: null
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

  componentDidMount() {
    axios.get('/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        loading: false
      })
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
        {this.state.redirect ? <Redirect to="/user/userID}"></Redirect> : ""}
        <h3>Edit my profile</h3>
        <h5><label for="username">Username:</label></h5>
        <input id="username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

        <h5><label for="email">E-Mail:</label></h5>
        <input id="email" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

        <h5><label for="password">Password:</label></h5>
        <input id="password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        <br></br>
        {spinner}

        <div id="profileimage"><Image src={this.state.profilePicUrl} alt="profile pic" /></div>
        <input
          type="file"
          onChange={this.handleFileUpload} />
          <div>Best Size 171x180 Pixel (max ... MB)</div>


        {/* interests / activities */}

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

        {/* 
  <div>
  <input type="checkbox" id="Sport" name="Sport"
         checked>
  <label for="Sport">Sport</label>
</div>

<div>
  <input type="checkbox" id="horns" name="horns">
  <label for="horns">Horns</label>
</div> */}



        <h5> <label for="activities">My activities:</label></h5>
        <input id="activities" type="text" name="activities" value={this.state.activities} onChange={e => this.handleChange(e)} />

        <br></br>
        <button onClick={this.submitHandler}>Save</button>
        {/* CANCEL Button if u dont want to change anything -> Page is not loading yet after clicking
        <button><Link to="/user/:userID">Cancel</Link> </button> */}


      </div>


    )
  }

}

export default Editprofile;