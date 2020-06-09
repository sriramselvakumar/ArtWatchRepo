import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
class LogoutButton extends Component {
  state = {};
  render() {
    return (
      <Link to="/">
        <Button variant="outline-success">Logout</Button>
      </Link>
    );
  }
}

export default LogoutButton;
