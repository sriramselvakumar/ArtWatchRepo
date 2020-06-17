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
import CardGroup from "react-bootstrap/CardGroup";

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
  }

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
    console.log(this.state.followers);
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
      const example = this.state.finalPosts;
      for (let i = 0; i < example.length; i++) {
        console.log(example[i].key);
      }
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

        <div className="jumbo">
          <CardGroup className="container">
            <Card style={{ width: "345px" }}>
              <Card.Body>
                <Image className=" profilePicture" src={fileName} rounded />
              </Card.Body>
            </Card>

            <Card style={{ width: "354px" }}>
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
            <Card style={{ width: "240px" }}>
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
          </CardGroup>

          <div className="container cardMargin">
            <CardColumns>{finalPosts}</CardColumns>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
