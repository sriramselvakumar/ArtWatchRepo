import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleClick = () => {
    localStorage.removeItem("token");
    logout({ returnTo: window.location.origin });
  };
  return (
    <Link to="/">
      <Button onClick={handleClick} variant="outline-success">
        Logout
      </Button>
    </Link>
  );
};

export default LogoutButton;
