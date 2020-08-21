import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class RegisterButton extends Component {
  state = {};
  render() {
    return (
      <Link to="/register">
        <Button variant="outline-success">Register</Button>
      </Link>
    );
  }
}

export default RegisterButton;
