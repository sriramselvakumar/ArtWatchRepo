import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  return (
    <React.Fragment>
      <Form className="mx-auto" style={{ width: "40%" }}>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Email: </Form.Label>
          <Form.Control
            placeholder="type Email"
            type="email"
            onChange={props.changeEmail}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="type password"
            onChange={props.changePassword}
          />
        </Form.Group>
      </Form>
      <div className="text-center">
        <Button onClick={props.submit} className="mt-2" variant="success">
          Login
        </Button>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
