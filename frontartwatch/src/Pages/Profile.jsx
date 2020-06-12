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

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    fileName: "",
    description: "",
    followers: [],
    following: [],
    posts: [],
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
      followers: followers,
      following: following,
      posts: [...posts],
    });
  };

  loadUserPosts = async () => {
    try {
      const response = await http.get(def.baseURL + "getuser/me");
      const { posts } = response.data;
      let postObjects = [];
      for (let i = 0; i < posts.length; i++) {
        let response = await http.get(def.baseURL + "post/" + posts[i]);
        postObjects.push(response.data);
      }

      this.setState({
        finalPosts: postObjects.map((post) => {
          return (
            <Postcard
              key={post._id}
              Name={post.name}
              Des={post.description}
              File={def.uploadsURL + post.filename}
              Likes={post.likes}
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
        <div className="jumbo">
          <div className="container details">
            <Image className="profilePicture" src={fileName} rounded />
            <div className="textDetails">
              <h1 className="name">
                {firstName} {lastName}
              </h1>
              <div className="description container">
                <Image className="Icons" src={descriptionIcon} />
                <p>{description}</p>
              </div>
            </div>
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
                <Image className="statsIcons followersIcon" src={postNumber} />
                <div>
                  <h3 className="followers statText">Posts</h3>
                  <h3 className="name statText text-center">{posts.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="Cards">
            <CardColumns>{finalPosts}</CardColumns>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
