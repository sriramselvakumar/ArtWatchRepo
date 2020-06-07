import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
class LoginButton extends Component {
  render() {
    return (
      <Link to="/login">
        <Button className="mr-1" variant="outline-success">
          Login
        </Button>
      </Link>
    );
  }
}

export default LoginButton;
