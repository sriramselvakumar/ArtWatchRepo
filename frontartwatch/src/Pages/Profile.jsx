import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import "../CSS/Profile.css";
import def from "../default.json";
import CardColumns from "react-bootstrap/CardColumns";
import CardDeck from "react-bootstrap/CardDeck";
import Postcard from "../Components/Postcard";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    description: "",
    followers: [],
    following: [],
    posts: [],
    fileName: "",
    finalPosts: [],
  };

  componentDidMount() {
    this.loadProfileData();
    this.loadUserPosts();
    this.postCleanup();
  }

  postCleanup = async () => {
    const response = await http.delete(def.postCleanup);
    console.log(response.data);
  };
  loadProfileData = async () => {
    const response = await http.get(def.baseURL + "getuser/me");
    const {
      firstName,
      lastName,
      profilePictureName,
      description,
      followers,
      following,
      posts,
    } = response.data;
    this.setState({
      firstName: firstName,
      lastName: lastName,
      fileName: def.uploadsURL + profilePictureName,
      description: description,
      followers: [...followers],
      following: [...following],
      posts: [...posts],
      finalPosts: [],
    });
  };

  handleDelete = async (id) => {
    const posts = this.state.finalPosts.filter((post) => post.key !== id);
    this.setState({ finalPosts: posts });
    this.setState({ posts: this.state.posts.filter((post) => post !== id) });
    await http.delete(def.baseURL + "post/" + id);
  };

  loadUserPosts = async () => {
    try {
      const response = await http.get(def.baseURL + "getuser/me");
      const { posts } = response.data;

      this.setState({
        finalPosts: posts.map((post) => {
          return (
            <Postcard
              key={post}
              edit={true}
              onDelete={this.handleDelete}
              id={post}
            />
          );
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {
      firstName,
      lastName,
      fileName,
      description,
      followers,
      following,
      posts,
      finalPosts,
    } = this.state;

    return (
      <React.Fragment>
        <Navbar profile={true} />
        <Jumbotron
          fluid
          style={{ minHeight: "100vh", "background-color": "#878787" }}
        >
          <div className="cardMargin">
            <CardColumns style={{ marginLeft: "60px" }}>
              <Card
                bg="dark"
                text="white"
                style={{ width: "18rem", marginRight: "20px" }}
              >
                <Card.Img variant="top" src={fileName} />
                <Card.Title className="text-center">
                  {firstName} {lastName}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="bg-dark">
                    <Card.Body>{description}</Card.Body>
                    <Button className="mr-1" variant="outline-success">
                      Followers: {followers.length}
                    </Button>

                    <Button className="mx-auto" variant="outline-success">
                      Following: {following.length}
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>

              {finalPosts}
            </CardColumns>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Profile;
