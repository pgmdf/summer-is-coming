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
    rating: 0,
    activityPicture: "",
  };

  formSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("/activities/add", this.state).then((response) => {
      this.setState({
        activity: response.data
      })
      if (this.props.addActivityCallback) {
        this.props.addActivityCallback(response.data);
      }
    });
  };

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
    spinnerHeight = "80px";
    loadingText = "Loading..."
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    axios.post("/activities/addImage", uploadData).then((resp) => {
      loadingText = "Uploaded succesfully!"
      this.setState({
        activityPicture: resp.data.pictureUrl,
      });



    });


    spinnerHeight = "0px"
  };

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
              rows="3"
              placeholder="Enter desription"
              name="description"
              value={this.state.description}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your rating from 1 (min.) to 6 (max.)"
              name="rating"
              value={this.state.rating}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <input
            type="file"
            onChange={this.handleFileUpload}
            name="activityPicture"
          ></input>
          <img height={spinnerHeight} width="90px" src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-10.jpg"></img>
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
