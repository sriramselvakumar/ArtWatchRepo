import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    try {
      const response = await http.get(def.baseURL + "/getuser/me");

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar showLogout={true} />
      </React.Fragment>
    );
  }
}

export default Profile;
