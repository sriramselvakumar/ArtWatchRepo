import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import http from "../axiosconfig/authaxios";
import Card from "react-bootstrap/Card";
import def from "../default.json";
import Alert from "react-bootstrap/Alert";
import "../CSS/Login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const setEmail = (e) => {
    let sample = user;
    sample.email = e.target.value;
    setUser(sample);
  };

  const setPassword = (e) => {
    let sample = user;
    sample.password = e.target.value;
    setUser(sample);
  };

  const onSubmit = async () => {
    let response = await http.post(def.loginUser, user);
    if (response.data === false) {
      setAlert(true);
      setMessage("Invalid Email or Password");
      return;
    }
    localStorage.setItem("token", response.data);
    window.location = "/myprofile";
  };

  const displayAlert = () => {
    if (showAlert) {
      return (
        <Alert
          className="mx-auto"
          variant="danger"
          onClose={() => setAlert(false)}
          dismissible
        >
          <Alert.Heading>
            <div className="text-center">{message}</div>
          </Alert.Heading>
        </Alert>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <Navbar showRegister={true} />
      <Jumbotron
        fluid
        style={{ "background-color": "#878787", height: "100vh" }}
      >
        {displayAlert()}
        <Card
          bg="dark"
          text="white"
          className="mx-auto"
          style={{ width: "60rem", padding: "5px" }}
        >
          <h1 className="text-center">Login</h1>
          <div className="loginForm mx-auto">
            <LoginForm
              changeEmail={setEmail}
              changePassword={setPassword}
              submit={onSubmit}
            />
          </div>
        </Card>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Login;
