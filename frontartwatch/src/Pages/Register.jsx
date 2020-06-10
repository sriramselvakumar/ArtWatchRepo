import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "../Components/Navbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }
  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  };

  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    try {
      let response = await http.post(def.baseURL + "/register", user);
      localStorage.setItem("token", response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location = "/createprofilepic";
  };
  render() {
    return (
      <React.Fragment>
        <Navbar showRegister={false} showLogin={true} showLogout={false} />
        <Jumbotron>
          <h1>Join Our Community</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </Col>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </Col>
            </Form.Row>
          </Form>
          <div className="text-center">
            <Button onClick={this.onSubmit} className=" mt-4" variant="success">
              Register
            </Button>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Register;
