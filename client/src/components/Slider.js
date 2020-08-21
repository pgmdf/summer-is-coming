import React, { Component, Carousel } from 'react';
import axios from 'axios';
import './../App.css';
import './../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActivityAdd from './activities/ActivityAdd';
import ActivityInterestMatch from './activities/ActivityInterestMatch'
import interests from '../configs/interests';


class Slider extends React.Component {

    state = {
        activity: null,
        loading: true,
    }


    componentDidMount() {
        axios.get('/api/activities/' + this.props.match.params.identifier).then((response) => {
            this.setState({
                activity: response.data,
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

            Test

            
            </div>
        )


    }


}



export default Slider;