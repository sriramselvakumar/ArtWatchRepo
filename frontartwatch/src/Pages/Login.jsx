import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      let response = await axios.post("http://localhost:5000/api/login", user);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    this.setState({
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1 className="text-center">Login To Our Community</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Group className="px-2" md="4" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Form.Group>
            <Form.Group className="px-2" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Form.Group>
            <Button onClick={this.onSubmit} className="ml-2" variant="success">
              Login
            </Button>
          </Form>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Login;
