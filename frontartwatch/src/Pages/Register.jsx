import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
class Register extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>Join Our Community</h1>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last name" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Col>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Row>
          </Form>
          <div className="text-center">
            <Button className=" mt-4" variant="success">
              Register
            </Button>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Register;
