import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import ArtWatchIcon from "../Images/ArtWatchIcon.png";
import Nav from "react-bootstrap/Nav";

import LoginButton from "../Components/LoginButton";
import RegisterButton from "../Components/RegisterButton";
class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={ArtWatchIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          ArtWatch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            <LoginButton />
            <RegisterButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
