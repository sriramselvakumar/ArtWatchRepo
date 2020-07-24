import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Jumbotron from "react-bootstrap/Jumbotron";
import Postcard from "../Components/Postcard";

import CardColumns from "react-bootstrap/CardColumns";
class Feed extends Component {
  state = {
    renderPosts: [],
    ownerID: "",
  };
  componentDidMount() {
    this.loadUser();
    this.loadPosts();
  }

  loadUser = async () => {
    const response = await http.get(def.baseURL + "getuser/me");
    this.setState({ ownerID: response.data._id });
  };

  loadPosts = async () => {
    const response = await http.get(def.baseURL + "post");
    let posts = response.data;
    this.setState({
      renderPosts: posts.map((post) => {
        return (
          <Postcard
            key={post._id}
            owner={this.state.ownerID}
            edit={false}
            id={post._id}
          />
        );
      }),
    });

    console.log(posts);
  };
  render() {
    return (
      <React.Fragment>
        <Navbar feed={true} />
        <Jumbotron style={{ backgroundColor: "#878787", minHeight: "100vh" }}>
          <div className="container">
            <CardColumns>{this.state.renderPosts}</CardColumns>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Feed;
