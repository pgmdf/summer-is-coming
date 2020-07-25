import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import './../Style.css'
import interests from '../configs/interests';
import { Redirect, Link } from 'react-router-dom';
import { Card, Image, Nav, Button, Col, Form } from 'react-bootstrap';



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
    loading: true,
  }

  componentDidMount() {
    axios.get('/api/user/' + this.props.userID).then((response) => {
      this.setState({
        user: response.data,
        login: response.data,
        loading: false,
      })
    })
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



  render() {
    if (this.state.loading) {
      return <div>Loading…</div>
    }
    /* console.log('Userdata',this.userInSession) */

    return (

      <div>
        {this.state.redirect ? <Redirect to={`/user/${this.props.userInSession._id}`}></Redirect> : ""}


        <Card border="dark" className="box-white">
          <Card.Header className="back-grey full-width flex-row text-left">
            <div className="flex-row">
              <div id="profileimage">
                <Image src={this.state.profilePicUrl} alt="profile pic" thumbnail />
                <input
                  type="file"
                  onChange={this.handleFileUpload} className="no-shadow no-bg" />
                <div>{this.state.uploadErrorMsg}</div>
              </div>
              <div>
                <div className="margin10">
                  <Card.Title> <h3 className="text-bright">Edit Profile</h3> </Card.Title>
                  <div>
                    <div className="bold-head text-bright">Username (visible):</div> <input id="username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                    <br />
                  </div>
                </div>
                <div className="bold-head text-bright">Choose your Interests:</div>
                <Col>
                  <Form.Group controlId="tags" className="interests">

                    {interests.map(i => (
                      <Form.Check className="form-check-inline" type="checkbox" label={i} name={i} checked={this.state.myInterests.includes(i)} onChange={this.handleCheckbox} />
                    ))
                    }

                  </Form.Group>

{/*                   <div className="form-check">
                    <ul id="edit-interests" name="interests">
                      {interests.map(i => (
                        <li>
                          <input type="checkbox" className="form-check-input mb-3 inline no-bg form-check-label form-check-inline" id={i} name={i} checked={this.state.myInterests.includes(i)} onChange={this.handleCheckbox} />
                          <label for={i}>{i}</label>
                        </li>
                      ))
                      }
                    </ul>
                  </div> */}
                </Col>
                <Button onClick={this.submitHandler}>Save</Button>  <br />
                <a href={"/user/" + this.props.userInSession._id}> Back to my Profil without saving </a>

              </div>
            </div>

          </Card.Header>

        </Card>




      </div>


    )
  }

}

export default Editprofile;