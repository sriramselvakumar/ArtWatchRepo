import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
const RegisterForm = (props) => {
  return (
    <React.Fragment>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label style={{ color: "white" }}>First Name</Form.Label>
            <Form.Control
              placeholder="First name"
              onChange={props.changeFirstName}
            />
          </Col>
          <Col>
            <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
            <Form.Control
              placeholder="Last name"
              onChange={props.changeLastName}
            />
          </Col>
        </Form.Row>
        <Form.Row className="mt-2">
          <Col>
            <Form.Label style={{ color: "white" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={props.changeEmail}
            />
          </Col>
          <Col>
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={props.changePassword}
            />
          </Col>
        </Form.Row>
      </Form>
      <div className="text-center">
        <Button onClick={props.submit} className=" mt-4" variant="success">
          Register
        </Button>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
