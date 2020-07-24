import React, { Component } from 'react';
import './../App.css';
import { Button } from 'react-bootstrap'


class Videointro extends Component {

    state = {
        activitiesArr: [],
        sortedActivities: []
    }


    componentDidMount() {
        axios.get('/api/activities').then((response) => {

            let sortedActivities = response.data.sort((a, b) => { if (a.timeStamp < b.timeStamp) { return 1 } else { return -1 } }).slice(0, 5)

            // console.log('Activities',response.data)
            this.setState({
                activitiesArr: response.data,
                sortedActivities: sortedActivities
            })
        })
    }

    render() {
        // console.log("props",this.props.userInSession.username)

        return (
            <div>


                <header>
                    <div className="overlay"></div>
                    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                        <source src="https://www.meetup.com/mu_static/de-DE/video.dddafbfe.mp4" type="video/mp4" />
                    </video>

                    <div className="container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                            <div className="w-100 text-white">
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

                </div>
        )

    }
}

export default Videointro;