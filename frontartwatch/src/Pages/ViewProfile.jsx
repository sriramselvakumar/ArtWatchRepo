import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";

class ViewProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    fileName: "",
    description: "",
    followers: [],
    following: [],
    posts: [],
    renderPosts: [],
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const postID = localStorage.getItem("post");
    //localStorage.removeItem('post')
    const response = await http.get(def.baseURL + "post/" + postID);
    const { owner } = response.data;
    const res = await http.get(def.baseURL + "getuser/");
    const {
      firstName,
      lastName,
      profilePictureName,
      description,
      followers,
      following,
      posts,
    } = res.data;
    this.setState({
      firstName,
      lastName,
      fileName: def.uploadsURL + profilePictureName,
      description,
      followers,
      following,
      posts,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar view={true} />
      </React.Fragment>
    );
  }
}

export default ViewProfile;
