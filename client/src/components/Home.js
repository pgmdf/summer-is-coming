import React, { Component, Nav, Link } from 'react';
import './../App.css';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap'
import Slider from './Slider';


class Home extends React.Component {

    state = {
        login: this.props.userInSession
    }

    logout = () => {
        return axios.post('/api/logout', {})
            .then(response => response.data)
    }


    render() {
        return (

            <div className="h-100" width="100%">


                <div className="overlay"></div>

                <div className="h-100">
                    <div className="h-100 text-center align-items-center">

                        <div><Image src="https://github.com/pgmdf/summer-is-coming/blob/master/client/public/z-logo-final.png?raw=true" />
                            <h1 className="display-3">The real world is calling</h1>
                            <div className="col-md-9 mx-auto">
                                <h3>Sometimes You don't have to go far to find the really important things in life.</h3><br />
                            </div></div>

                            <div className="lead mb-0">{this.props.userInSession ? "Hello " + this.props.userInSession.username + "! What do you want to do today?" :
                            <p className="lead mb-0">Join our community to try something new! Or do more of what you love ... <br /><a href="/signup"><Button>Join us</Button></a> <br/><br/> <p>Already a part of the community? Go and explore! <br />
                                <a href="/login"><Button>Log in</Button></a></p></p>}</div>

                    </div>
                </div>


                


                {/* {this.state.sortedActivities ? <Slider sliderData={this.state.sortedActivities} /> : ""} */}




            </div>
        );
    }

}

export default Home;

