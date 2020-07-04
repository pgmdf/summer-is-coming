import React from 'react';
// import logo from './logo.svg';
import './../App.css';
import './../Style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Col, Row, Button } from 'react-bootstrap'

class Dummy extends React.Component {
    state = ""

    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col>
                            <h1>Title 1</h1>
                            <h2>Title 2</h2>
                            <h3>Title 3</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled>I'm an inactive button</Button>
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
                </Container>
            </div>
        );
    }
}

export default Dummy;
