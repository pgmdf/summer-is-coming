import React, { Component } from 'react';
import './../App.css';
import Slider from './Slider';
import axios from 'axios';
import {Jumbotron, Image, Button} from 'react-bootstrap'


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
              
                {/* <h1>{this.props.userInSession ? 
                "Hello "+this.props.userInSession.username : <a href="/signup">Sign up for free here & see the latest activities!</a>}</h1> */}

                <header>
                <div className="overlay"></div>
                <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    <source src="https://www.meetup.com/mu_static/de-DE/video.dddafbfe.mp4" type="video/mp4"/>
                </video>
                
                <div className="container h-100">
                    <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <div><Image src="https://github.com/pgmdf/summer-is-coming/blob/master/client/public/z-logo-final.png?raw=true"/></div>
                        <h1 className="display-3">The real world is calling</h1>
                        <p className="lead mb-0">Join our community to try something new, or do more of what you love
</p>

<Button id="home-btn" variant="primary">Join us</Button>

                    </div>
                    </div>
                </div>
                </header>

            <section className="my-5">
            <div className="container">
                <div className="row">
                <div className="col-md-8 mx-auto">
                    <p>You don't have to go far to find the really important things in life.</p>
                </div>
                </div>
            </div>
            </section>

                {/* <Jumbotron>
                <h1>Welcome to Summer-is-Coming!</h1>
                <p> 
                    <Image src="https://cdn.pixabay.com/photo/2016/03/09/09/59/men-1245982_960_720.jpg" fluid/>
                </p>
                <p>
                 <Button variant="primary">Learn more</Button>
                </p>
                </Jumbotron> */}



                {/* {this.state.sortedActivities ? 
                    <Slider sliderData={this.state.sortedActivities}/> : ""                
                } */}
            </div>
        )

    }
}

export default Home;