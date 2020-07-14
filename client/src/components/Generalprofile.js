import React, { Component, Link, imgUrl } from "react";
import "./../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Image, Nav, Row, Col } from 'react-bootstrap';
import axios from "axios";



class Generalprofile extends Component {
    state = {
        activity: null,
        loading: true,
        user: null,
    };


    /* For later: as soon as change /userprofile route in App and navigation 
      also change auth routes from userprofile into user/:userID 
  
      // ruff try //
      componentDidMount() {
        axios.get('/user/' + this.props.userID).then(() => {response.data in state})
      }
      backend route für user aus datenbank suchen und widergeben */

    /*  /* is it correct like that?
        also change auth routes from userprofile into user/:userID 
    
          // END // */


    componentDidMount() {
        axios.get('/user/' + this.props.userID).then((response) => {
            this.setState({
                user: response.data,
                loading: false
            })
        })
    }


    render() {
        /*         if (this.state.loading) {
                  return <div>Loading…</div>
                } */
        return (
            <div>
                {this.props.userID !== this.props.userInSession._id ? "" : <Nav.Link href="/editprofile"> edit my profile </Nav.Link>}

                {this.state.loading ? "" : this.state.user.username}
           

            </div>
        );
    }
}

export default Generalprofile;
