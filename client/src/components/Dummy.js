import React from 'react';
// import logo from './logo.svg';
import './../App.css';
import './../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Col, Row, Button, NavLink, Card, Image } from 'react-bootstrap'

class Dummy extends React.Component {
    state = ""

    render() {
        return (
            <div className="App">

                <Container>
                    <div>
                        Basic Colors
                    <div id="E5FFF3"></div>
                        <div id="17838A"></div>
                        <div id="C4C4C4"></div>
                        <div id="53595B"></div>
                    </div>
                    <a href="/home">Ich bin ein Testlink</a>
                    <NavLink to="/home">Ich auch aber LINK</NavLink>

                    <Row>
                        <Col>
                            <h1>Title 1</h1>
                            <h2>Title 2</h2>
                            <h3>Title 3</h3>
                            <h4>Title 4</h4>
                            <div className="bold-head">bold-head and inline</div>
                            <ul className="inline">
                                <li className="border-bottom">Liststyle</li>
                                <li>Liststyle</li>
                                <li className="text-bright">Ich bin Text mit text-bright</li>
                            </ul>
                            <div className="flex-row" width="80%">
                                <div>Divs in display flex </div>
                                <div className="back-grey max-width">Style grey Background and max width</div>
                            </div>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled className="btn-inactive">I'm an inactive button</Button>
                        </Col>
                        <Col>
                            <Button className="btn"></Button>
                        </Col>
                        <Col>
                            <Button>I'm an active button</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Feel free to add some links to check if they work...</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" placeholder="I'm an input field" />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <div className="box-grey">
                                <h3>Headline</h3>
                                <p>
                                    Cupcake ipsum dolor sit amet cheesecake. Gingerbread muffin topping. Croissant brownie liquorice icing candy. Croissant brownie.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="box-white">
                                <h3>Headline</h3>
                                <p>
                                    Cupcake ipsum dolor sit amet cheesecake. Gingerbread muffin topping. Croissant brownie liquorice icing candy. Croissant brownie.
                                </p>
                            </div>
                        </Col>
                    </Row>

                </Container>
                <br /><br /><br />

                <div>
                    <h2>ACTIVITY NAME</h2>
                    <Card className="activity" border="dark">
                        <Card.Img src="https://learn.zoner.com/wp-content/uploads/2018/08/landscape-photography-at-every-hour-part-ii-photographing-landscapes-in-rain-or-shine-683x390.jpg" alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>Location Name?</Card.Title>
                            <Card.Text>
                                Description Text?
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                             </Card.Text>
                            <Card.Text>Last updated 3 mins ago</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <Card.Text>
                                <div className="flex-row" id="justify-between">
                                    <div>
                                        Or short Description Text here?
                               </div>
                                    <div>
                                        Tags: day / activity / date / badweather
                               </div>
                                </div>


                            </Card.Text>

                        </Card.Body>
                    </Card>
                </div>

                <br /><br /><br />
                <div>
                    <h2>Profile</h2>
                    <Card border="dark" className="profile">
                        <Card.Header>
                            <div className="flex-row">
                                <div id="profileimage">
                                    <Image src="https://images-na.ssl-images-amazon.com/images/I/51KR6NipshL._AC_SX355_.jpg" alt="profile-pic" thumbnail fluid/>
                                </div>
                                <div id="profile-info">
                                    <Card.Title> Chuck's Profile </Card.Title>
                                    <div>
                                        Name: Chuck <br />
                                        Living in: Berlin <br />
                                        Member since: 01.07.2020 <br />
                                        My Interests: <ul>
                                            <li>Sports / </li>
                                            <li>Sports / </li>
                                            <li>Sports / </li>
                                            <li>Sports</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            <div>
                                <Card.Title>My Favorite Activities</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                        <li>Fav Activity / </li>
                                    </ul>
                                </Card.Text>
                            </div>

                            <div>
                                <Card.Title>My Bucket List</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                        <li>Bucket Activity / </li>
                                    </ul>
                                </Card.Text>
                            </div>

                        </Card.Body>
                    </Card>
                </div>

            </div>
        );
    }
}

export default Dummy;
