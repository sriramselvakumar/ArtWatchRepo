import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import Image from "react-bootstrap/Image";
import http from "../axiosconfig/authaxios";
import "../CSS/Profile.css";
import def from "../default.json";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    fileName: "",
  };

  componentDidMount() {
    this.loadProfileData();
  }

  loadProfileData = async () => {
    const response = await http.get(def.baseURL + "getuser/me");
    this.setState({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      fileName: def.uploadsURL + response.data.profilePictureName,
    });
  };

  render() {
    const { firstName, lastName, fileName } = this.state;
    return (
      <React.Fragment>
        <Navbar showLogout={true} />
        <div className="jumbo">
          <Image className="profilePicture" src={fileName} rounded />
          <h1 className="ml-2">
            {firstName} {lastName}
          </h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
