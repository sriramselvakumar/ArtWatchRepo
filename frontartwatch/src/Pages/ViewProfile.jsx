import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Postcard from "../Components/Postcard";
import "../CSS/Profile.css";
import CardGroup from "react-bootstrap/CardGroup";
import descriptionIcon from "../Images/descriptionfemale.png";
import followersIcon from "../Images/followers.png";
import followingIcon from "../Images/following.png";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import postNumber from "../Images/instant-camera.png";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";

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
                  <div className="text-center">
                    <Button onClick={this.handleFollow} variant="success">
                      {buttonText}
                    </Button>
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
            <CardColumns>{renderPosts}</CardColumns>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewProfile;
