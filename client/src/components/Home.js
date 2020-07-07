import React, { Component } from 'react';
import './../App.css';
import Slider from './Slider';

class Home extends Component {
    constructor(props){
        super(props);
      }
    render(){
        // console.log("props",this.props.userInSession.userDoc.username)
        return( 
            <div>
                <Slider />
                <h1>{this.props.userInSession.userDoc ? 
                "Hello "+this.props.userInSession.userDoc.username : "go away Stranger" }</h1>
            </div>
        )
    }
}

export default Home;