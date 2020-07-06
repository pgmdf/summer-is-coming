import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import moment from 'moment';

class ActivityAdd extends Component {

    state = {
        title: "",
        description: "",
        tags: []
    }

    formSubmitHandler = (event) => {
        event.preventDefault()

        let newActivity = this.state

        this.props.addActivityCallback(newActivity)

        axios.post('/activities/add', this.state).then((response) => {
            this.setState({
                activity: response.data
            })
        })
    }


    changeHandler = (event) => {
        let currentInputValue = event.target.value
        let inputName = event.target.name

        this.setState({
            [inputName]: currentInputValue
        })
    }

    render() {

        return (
            <div>
                <Container>
                    <h1>Add your favourite activity</h1>
                    <Form onSubmit={this.formSubmitHandler}>
                        <Form.Group controlId="title">
                            <Form.Label>Name of the activity</Form.Label>
                            <Form.Control type="text" placeholder="Enter the title" name="title" value={this.state.title} onChange={this.changeHandler} />
                        </Form.Group>
                       <Form.Group controlId="tags">
                            <Form.Label>tags</Form.Label>
                            <Form.Control type="text" placeholder="Enter tags i.e. food, water, challenge" name="tags" value={this.state.tags} onChange={this.changeHandler}  />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter desription" name="description" value={this.state.description} onChange={this.changeHandler}  />
                        </Form.Group>
                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" placeholder="Enter your rating from 0 (min.) to 5 (max.)" name="rating" value={this.state.rating} onChange={this.changeHandler}  />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit activity
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default ActivityAdd;
