import React from 'react';
// import logo from './logo.svg';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import axios from "axios";


class Navigation extends React.Component {
    state ={
        login: this.props.userInSession
    }
     logout = () => {
        return axios.post('/api/logout', {})
          .then(response => response.data)
      }
      

    render() {
        return (
            <div className="App">
                <Navbar bg="light" expand="lg" className="sticky-nav">
                    <Navbar.Brand href="/"> <Image src="https://github.com/pgmdf/summer-is-coming/blob/master/client/public/z-logo-final-2zeilig.png?raw=true" height="35px" /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">


                        <Nav className="mr-auto">
                            {this.props.user? "" : <Nav.Link href ="/signup"> Signup </Nav.Link>}
                            {this.props.user? "" : <Nav.Link href ="/login"> Login </Nav.Link>}
  
                            {this.props.user ? <Nav.Link href="/activities">Explore activities</Nav.Link> : <Nav.Link href="/signup">Explore activities</Nav.Link>}

                            {/* <Nav.Link href="/activities/discovery">Discover activities</Nav.Link> */}
                           
                            {this.props.user ? <Nav.Link href="/activities/add">Add a new activity</Nav.Link> : <Nav.Link href="/signup">Add a new activity</Nav.Link>}
                           
                            {/* <Nav.Link href="/activities/add">Add a new activity</Nav.Link> */}



                            {/* <NavDropdown title="Activities" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/activities">See all activities</NavDropdown.Item>
                                <NavDropdown.Item href="/activities/discovery">Discover activities</NavDropdown.Item>
                                <NavDropdown.Item href="/activities/add">Add an activity</NavDropdown.Item>
                            </NavDropdown> */}
                            {this.props.user?
                            <Nav.Link href={`/user/${this.props.user._id}`}>My profile</Nav.Link>                        
                            : ""}

                            {this.props.user?
                                <button id="logout"onClick={this.logout}>
                            <Nav.Link href="/">Logout</Nav.Link> 
                            </button>
                            : ""}




                            {/* {this.props.user? <NavDropdown title="Profile" id="collasible-nav-dropdown">

                            <NavDropdown.Item href={`/user/${this.props.user._id}`}>My Profile</NavDropdown.Item>  */}
                            {/* <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item> */}
                            {/* <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item> */}
                            
                            {/* <button id="logout"onClick={this.logout}>
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                            </button>
                            </NavDropdown> : ""} */}

                            {/* <Nav.Link href="/dummy">Styles Dummy</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
