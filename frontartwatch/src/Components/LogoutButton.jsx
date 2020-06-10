import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
class LogoutButton extends Component {
  handleClick = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  render() {
    return (
      <Link to="/">
        <Button onClick={this.handleClick} variant="outline-success">
          Logout
        </Button>
      </Link>
    );
  }
}

export default LogoutButton;
