import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import './../Style.css'
import interests from '../configs/interests';
import { Redirect } from 'react-router-dom';
import { Card, Image, Nav, Button, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


//import {sizeOf} from 'image-size'
// var sizeOf = require('image-size');


class Editprofile extends Component {

  state = {
    username: this.props.userInSession.username,
    email: this.props.userInSession.email,
    password: this.props.userInSession.password,
    profilePicUrl: this.props.userInSession.profilePicUrl,
    myFavoriteActivities: this.props.userInSession.myFavoriteActivities,
    myInterests: this.props.userInSession.myInterests || [],
    redirect: false,
    user: null,
    uploadErrorMsg: "",
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
    console.log(e.target.files[0].size)
    if (e.target.files[0].size > 500000) {
      this.setState({
        uploadErrorMsg: "Image too big. Please use smaller size."
      })
    }

    else {
      this.setState({
        profilePicUrl: "https://cdn.lowgif.com/full/ff8280aafe27319d-ajax-loading-gif-transparent-background-2-gif-images.gif",
        uploadErrorMsg: "",
      })

      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      axios.put('/api/image', uploadData).then((resp) => {

        this.setState({
          profilePicUrl: resp.data.image_url
        })
      })

    }
  }

  componentDidMount() {
    axios.get('/api/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
      })
    })
  }


  render() {

console.log('Userdata',this.userInSession)

    return (

      <div>
        {this.state.redirect ? <Redirect to={`/user/${this.props.userInSession._id}`}></Redirect> : ""}



        {/* {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href={"/user" + this.props.userID}> back to my profile </Nav.Link>} */}

        <h3>Edit my profile</h3>
        
        <h5><label for="username">Username:</label></h5>
        <input id="username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

        <h5><label for="email">E-Mail:</label></h5>
        <input id="email" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

{/*         <h5><label for="password">Password:</label></h5>
        <input id="password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        <br></br> */}


        <div id="profileimage"><Image src={this.state.profilePicUrl} alt="profile pic" /></div>
        <input
          type="file"
          onChange={this.handleFileUpload} />
        <div>{this.state.uploadErrorMsg}</div>


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
        {/* CANCEL Button if u dont want to change anything -> Page is not loading yet after clicking
        <button><Link to="/user/:userID">Cancel</Link> </button> 
        or <Redirect to="/user/userID}"></Redirect> */}

      </div>


    )
  }

}

export default Editprofile;