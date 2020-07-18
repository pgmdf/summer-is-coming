import React, { Component } from 'react';
import './../App.css';
import Slider from './Slider';
import axios from 'axios';


class Home extends Component {

    state = {
        activitiesArr: [],
        sortedActivities: []
    }
    
    
    componentDidMount() {
    axios.get('/activities').then((response) => {

        let sortedActivities = response.data.sort((a,b) => { if (a.timeStamp < b.timeStamp) { return 1 } else { return -1 } }).slice(0,5)

        // console.log('Activities',response.data)
        this.setState({
        activitiesArr: response.data,
        sortedActivities: sortedActivities
        })
    })
    }

    render(){
        // console.log("props",this.props.userInSession.username)
        
        return( 
            <div>
                {this.state.sortedActivities ? 
                    <Slider sliderData={this.state.sortedActivities}/> : ""                
                }
                <h1>{this.props.userInSession ? 
                "Hello "+this.props.userInSession.username : <a href="/signup">Sign up for free here & see the latest activities!</a>}</h1>
            </div>
        )

    }
}

export default Home;