import React, { useState, useEffect } from "react";
import Navbar from "../Components/LogNavbar";
import Spinner from "../Components/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import urls from "../default.json";
import http from "../axiosconfig/authaxios";
const TrialPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, [isAuthenticated]);

  const loadToken = async () => {
    if (isAuthenticated) {
      const { data } = await http.post(urls.loginUser, { email: user.email });
      localStorage.setItem("token", data.token);
      window.location = data.redirect;
    }
  };
  return (
    <React.Fragment>
      <Navbar profile={true} />
      <Spinner />
    </React.Fragment>
  );
};

export default TrialPage;
