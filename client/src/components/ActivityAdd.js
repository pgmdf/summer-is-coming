import React, { Component } from "react";
import axios from "axios";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button } from "react-bootstrap";
import interests from '../configs/interests';

let spinnerHeight = "0px"
let loadingText = "";


class ActivityAdd extends Component {
  state = {
    title: "",
    description: "",
    tags: [],
    // TODO: finish #rating in beta-version rating: 0,
    location: "",
    activityPicture: "",
    uploadErrorMsg: "",
  };

  formSubmitHandler = (e) => {
    e.preventDefault();

   
    axios.post("/activities/add", this.state).then((response) => {
      this.setState({
        activity: response.data,
      })
      if (this.props.addActivityCallback) {
        this.props.addActivityCallback(response.data);
      }
    });
  }

  changeHandler = (event) => {
    let currentInputValue = event.target.value;
    let inputName = event.target.name;
    this.setState({
      [inputName]: currentInputValue,
    });
  };

  handleCheckbox = (event) => {
    const checked = event.target.checked
    const tagName = event.target.name

    let newArr;
    if (checked) {
      newArr = this.state.tags.concat(tagName)
    } else {
      newArr = this.state.tags.filter(i => i !== tagName)
    }

    this.setState({
      tags: newArr
    })
  }

  //uo
  handleFileUpload = (e) => {
    if (e.target.files[0].size > 500000) {
      this.setState({
        uploadErrorMsg: "Image too big. Please use smaller size."
      })
     } else {
      this.setState({
        uploadErrorMsg: "Uploading..."
      })
 
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    axios.post("/activities/addImage", uploadData).then((resp) => {
      this.setState({
        activityPicture: resp.data.pictureUrl,
        uploadErrorMsg: "Done!",
      });

    });
    spinnerHeight = "0px"
  }}

  render() {

    return (
      <div>
        <h1>Add your favourite activity</h1>
        <Form onSubmit={this.formSubmitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Name of the activity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              name="title"
              value={this.state.title}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="tags">

            {interests.map(i => (
              <Form.Check type="checkbox" label={i} name={i} checked={this.state.tags.includes(i)} onChange={this.handleCheckbox} />
            ))
            }


          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              placeholder="Enter description"
              name="description"
              value={this.state.description}
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the location"
              name="location"
              value={this.state.location}
              onChange={this.changeHandler}
            />
          </Form.Group>

          {/* //TODO: #rating finish in beta-version
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your rating from 1 (min.) to 6 (max.)"
              name="rating"
              value={this.state.rating}
              onChange={this.changeHandler}
            />
          </Form.Group> */}
          <input
            type="file"
            onChange={this.handleFileUpload}
            name="activityPicture"
          ></input>
          <div>{this.state.uploadErrorMsg}</div>
          <img height={spinnerHeight} width="90px" src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-10.jpg" alt="animated gif showing loading process"></img>
          <div>{loadingText} </div>
          <Button variant="primary" type="submit">
            Submit activity
          </Button>

        </Form>
      </div>
    );
  }
}

export default ActivityAdd;
