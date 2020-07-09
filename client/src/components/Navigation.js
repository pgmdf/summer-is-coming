import React from 'react';
// import logo from './logo.svg';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import { logout } from '../../api'


class Navigation extends React.Component {
    state ={
        login: this.props.userInSession
    }

    // const logoutUser = (props) =>{
    //     logout()
    //     .then(() => {
    //       props.updateUser(null);  // sets the global user object to 'null'
    //     })
    //   }

//     componentDidUpdate = (prevprops)  => {
//    if (this.props.userInSession !== prevprops.userInSession) {
//        this.setState({
//            login: this.props.userInSession
//        })
//    }
//     }


    render() {

        return (
            <div className="App">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Summer is coming</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {this.props.user? "" : <Nav.Link href ="/signup"> Signup </Nav.Link>}
                            {/* <Nav.Link href="/signup">Signup</Nav.Link> */}
                            <Nav.Link href="/login">Login</Nav.Link>
                            <NavDropdown title="Profile" id="collasible-nav-dropdown">

                            <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>

                            {/* <Link to='/'>
                                <button onClick={() => logoutUser(props)}>Logout</button>
                            </Link> */}

                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Activities" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/activities">See all activities</NavDropdown.Item>
                                <NavDropdown.Item href="/activities/add">Add an activity</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/dummy">Styles Dummy</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
