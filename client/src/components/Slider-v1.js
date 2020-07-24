import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './../App.css';


function Slider(props) {

    console.log('props.sliderData:', props.sliderData)
    return (
        <div>
            <Carousel>

                {props.sliderData.map(activity => {
                    {/* console.log('eachActivity:', activity) */ }
                    return (

                        <Carousel.Item height={300}>
                            <Link to={"/activities/" + activity._id} key={activity._id}>

                                <img height={300}
                                    className="d-block"
                                    src={activity.pictureUrl[0]}
                                    alt={activity.title}
                                />
                                <Carousel.Caption>
                                    <h3>{activity.title}</h3>
                                    <p>{activity.description}</p>
                                </Carousel.Caption>
                            </Link>

                        </Carousel.Item>
                    )
                })
                }

            </Carousel>
        </div>
    )
}

export default Slider;