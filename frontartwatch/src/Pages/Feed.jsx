import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Jumbotron from "react-bootstrap/Jumbotron";

class Feed extends Component {
  state = {
    ownerID: "",
    name: "",
  };
  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    try {
      const response = await http.get(def.baseURL + "getuser/me");
      this.setState({
        ownerID: response.data._id,
        name: response.data.firstName,
      });
    } catch (error) {}
  };
  render() {
    return (
      <React.Fragment>
        <Navbar feed={true} />
        <Jumbotron></Jumbotron>
      </React.Fragment>
    );
  }
}

export default Feed;
