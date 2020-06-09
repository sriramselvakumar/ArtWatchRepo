import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import http from "../axiosconfig/authaxios";
import Navbar from "../Components/Navbar";
import def from "../default.json";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alert: false,
    };
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeAlert = () => {
    this.setState({ alert: !this.state.alert });
  };

  alertRender = () => {
    if (this.state.alert) {
      return (
        <Alert variant="danger" onClose={this.onChangeAlert} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You entered an invalid email or password</p>
        </Alert>
      );
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      let response = await http.post(def.baseURL + "/login", user);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      this.onChangeAlert();
    }
    this.setState({
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar showLogout={false} showLogin={false} showRegister={true} />
        <Jumbotron>
          {this.alertRender()}
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
