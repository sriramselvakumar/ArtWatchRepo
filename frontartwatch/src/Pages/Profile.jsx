import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import Image from "react-bootstrap/Image";
import http from "../axiosconfig/authaxios";
import "../CSS/Profile.css";
import def from "../default.json";
import descriptionIcon from "../Images/descriptionfemale.png";
import followersIcon from "../Images/followers.png";
import followingIcon from "../Images/following.png";
import postNumber from "../Images/instant-camera.png";
import CardColumns from "react-bootstrap/CardColumns";
import Postcard from "../Components/Postcard";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";

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

        <Jumbotron style={{ height: "100vh", "background-color": "#878787" }}>
          <div className="profileDetails mx-auto">
            <Card
              bg="dark"
              text="white"
              style={{ width: "345px", height: "345px", marginLeft: "60px" }}
            ></Card>
            <Card
              bg="dark"
              text="white"
              style={{
                width: "345px",
                height: "345px",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <Card.Body>
                <Image className=" profilePicture" src={fileName} rounded />
              </Card.Body>
            </Card>
            <Card
              bg="dark"
              text="white"
              style={{ width: "354px", marginRight: "20px", height: "345px" }}
            >
              <Card.Body>
                <div className="textDetails">
                  <h1 className="name">
                    {firstName} {lastName}
                  </h1>
                  <div className="description ">
                    <Image className="Icons" src={descriptionIcon} />
                    <p>{description}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card
              bg="dark"
              text="white"
              style={{ width: "240px", height: "345px" }}
            >
              <Card.Body>
                <div className="stats">
                  <div className="description">
                    <Image
                      className="statsIcons followersIcon"
                      src={followersIcon}
                    />
                    <div>
                      <h3 className="followers statText">Followers</h3>
                      <h3 className="name statText text-center">
                        {followers.length}
                      </h3>
                    </div>
                  </div>
                  <div className="description">
                    <Image
                      className="statsIcons followersIcon"
                      src={followingIcon}
                    />
                    <div>
                      <h3 className="followers statText">Following</h3>
                      <h3 className="name statText text-center">
                        {following.length}
                      </h3>
                    </div>
                  </div>
                  <div className="description">
                    <Image
                      className="statsIcons followersIcon"
                      src={postNumber}
                    />
                    <div>
                      <h3 className="followers statText">Posts</h3>
                      <h3 className="name statText text-center">
                        {posts.length}
                      </h3>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card
              bg="dark"
              text="white"
              style={{ width: "345px", height: "345px", marginLeft: "20px" }}
            ></Card>
          </div>
          <div className="cardMargin">
            <CardColumns style={{ marginLeft: "60px" }}>
              {finalPosts}
            </CardColumns>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Profile;
