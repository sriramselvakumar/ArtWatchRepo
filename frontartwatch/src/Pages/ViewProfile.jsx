import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Postcard from "../Components/Postcard";
import "../CSS/Profile.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import CardColumns from "react-bootstrap/CardColumns";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class ViewProfile extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    fileName: "",
    description: "",
    followers: [],
    following: [],
    posts: [],
    renderPosts: [],
    buttonText: "",
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const postID = localStorage.getItem("post");
    localStorage.removeItem("post");
    const response = await http.get(def.baseURL + "post/" + postID);
    const { owner } = response.data;
    const res = await http.get(def.baseURL + "getuser/" + owner);
    const {
      _id,
      firstName,
      lastName,
      profilePictureName,
      description,
      followers,
      following,
      posts,
    } = res.data;
    this.setState({
      id: _id,
      firstName,
      lastName,
      fileName: def.uploadsURL + profilePictureName,
      description,
      followers,
      following,
      posts,
    });
    const postList = [...this.state.posts];
    const answer = await http.get(def.baseURL + "getuser/me");
    const isFollowed = this.state.followers.includes(answer.data._id);
    if (isFollowed) {
      this.setState({ buttonText: "Unfollow" });
    } else if (!isFollowed) {
      this.setState({ buttonText: "Follow" });
    }
    this.setState({
      renderPosts: postList.map((post) => {
        return (
          <Postcard key={post} edit={false} id={post} owner={answer.data._id} />
        );
      }),
    });
  };

  handleFollow = async () => {
    const { followers, id } = this.state;
    const user = await http.get(def.baseURL + "getuser/me");
    const isFollow = followers.includes(user.data._id);
    if (isFollow) {
      this.setState({ buttonText: "Follow" });
      const list = [...followers];
      this.setState({
        followers: list.filter((item) => item !== user.data._id),
      });
      await http.get(def.baseURL + "getuser/follow/" + id + "/1");
    } else if (!isFollow) {
      this.setState({ buttonText: "Unfollow" });
      const list = [...followers];
      list.push(user.data._id);
      this.setState({ followers: list });
      await http.get(def.baseURL + "getuser/follow/" + id + "/0");
    }
  };

  render() {
    let {
      firstName,
      lastName,
      fileName,
      description,
      followers,
      following,
      posts,
      renderPosts,
      buttonText,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar view={true} />
        <Jumbotron style={{ backgroundColor: "#878787", minHeight: "100vh" }}>
          {" "}
          <div className="cardMargin">
            <CardColumns>
              <Card
                bg="dark"
                text="white"
                style={{ width: "18rem", marginRight: "20px" }}
              >
                <Card.Img variant="top" src={fileName} />
                <Card.Title className="text-center">
                  {firstName} {lastName}
                </Card.Title>
                <div className="text-center">
                  <Button variant="outline-success" onClick={this.handleFollow}>
                    {buttonText}
                  </Button>
                </div>
                <ListGroup>
                  <ListGroupItem className="bg-dark text-center">
                    {description}
                    <Button className="mr-1" variant="outline-success">
                      Followers: {followers.length}
                    </Button>

                    <Button className="mx-auto" variant="outline-success">
                      Following: {following.length}
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
              {renderPosts}
            </CardColumns>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default ViewProfile;
