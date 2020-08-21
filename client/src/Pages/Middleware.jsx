import React, { useState, useEffect } from "react";
import Navbar from "../Components/LogNavbar";
import Spinner from "../Components/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useAuth0 } from "@auth0/auth0-react";
import urls from "../default.json";
import http from "../axiosconfig/authaxios";
const TrialPage = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    loadToken();
  }, [isAuthenticated]);

  const loadToken = async () => {
    if (isAuthenticated) {
      console.log(user.email);
      const { data } = await http.post(urls.loginUser, { email: user.email });
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location = data.redirect;
    } else {
      console.log("we arent authenticated");
    }
  };
  return (
    <React.Fragment>
      <Navbar profile={true} />
      <Jumbotron
        fluid
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
          minHeight: "100vh",
        }}
      >
        <Spinner />
      </Jumbotron>
    </React.Fragment>
  );
};

export default TrialPage;
