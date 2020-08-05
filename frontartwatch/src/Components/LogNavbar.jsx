import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ArtWatchIcon from "../Images/ArtWatchIcon.png";
import Logout from "../Components/LogoutButton";
import Settings from "../Images/setting.png";

class LoggedNavbar extends Component {
  renderOptions = () => {
    const { profile, feed, create, edit, view } = this.props;
    if (profile) {
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/createpost">Create</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Brand href="#">
              <img
                alt="Settings icon"
                src={Settings}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Logout />
          </Nav>
        </React.Fragment>
      );
    } else if (view) {
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/myprofile">Profile</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/createpost">Create</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Brand href="#">
              <img
                alt="Settings icon"
                src={Settings}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Logout />
          </Nav>
        </React.Fragment>
      );
    } else if (feed) {
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/myprofile">Profile</Nav.Link>
            <Nav.Link href="/createpost">Create</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Brand href="#">
              <img
                alt="Settings icon"
                src={Settings}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Logout />
          </Nav>
        </React.Fragment>
      );
    } else if (create) {
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/myprofile">Profile</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Brand href="#">
              <img
                alt="Settings icon"
                src={Settings}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Logout />
          </Nav>
        </React.Fragment>
      );
    } else if (edit) {
      return (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/myprofile">Profile</Nav.Link>
            <Nav.Link href="/createpost">Create</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Brand href="#">
              <img
                alt="Settings icon"
                src={Settings}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Logout />
          </Nav>
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/myprofile">
          <img
            alt="ArtWatch Logo"
            src={ArtWatchIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          ArtWatch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {this.renderOptions()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoggedNavbar;
