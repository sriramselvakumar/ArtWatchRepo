import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Alert from "react-bootstrap/Alert";

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
          style={{ width: "80%" }}
          dismissible
        >
          <Alert.Heading>Error!</Alert.Heading>
          <p>{message}</p>
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
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(22,20,69,1) 0%, rgba(17,17,115,1) 42%, rgba(0,144,203,1) 100%)",
          minHeight: "100vh",
        }}
      >
        {displayAlert()}

        <h1 className="text-center" style={{ color: "white" }}>
          Login
        </h1>

        <LoginForm
          changeEmail={setEmail}
          changePassword={setPassword}
          submit={onSubmit}
        />
      </Jumbotron>
    </React.Fragment>
  );
};

export default Login;
