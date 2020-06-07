import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1 className="text-center">Login To Our Community</h1>
          <Form>
            <Form.Group className="px-2" md="4" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="px-2" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className="ml-2" variant="success">
              Login
            </Button>
          </Form>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Login;
