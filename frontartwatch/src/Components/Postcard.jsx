import React, { Component } from "react";
import { Card, Button, CardDeck } from "react-bootstrap";
import "../CSS/Postcard.css";
import http from "../axiosconfig/authaxios";
import def from "../default.json";

class PostCard extends Component {
  state = {
    file: "",
    name: "",
    description: "",
    likes: [],
    likesClass: "",
  };

  componentDidMount() {
    this.getCardDetails();
  }

  getCardDetails = async () => {
    const { id, owner } = this.props;
    const response = await http.get(def.baseURL + "post/" + id);
    const { name, description, filename, likes } = response.data;
    this.setState({
      file: def.uploadsURL + filename,
      name: name,
      description: description,
      likes: [...likes],
    });
    const isLiked = this.state.likes.includes(owner);
    if (isLiked) {
      this.setState({ likesClass: "fa fa-thumbs-up fa-2x" });
    } else if (!isLiked) {
      this.setState({ likesClass: "fa fa-thumbs-o-up fa-2x" });
    }
  };

  handleEdit = () => {
    localStorage.setItem("postID", this.props.id);
    window.location = "/edit";
  };

  handleLike = async () => {
    const { owner, id } = this.props;
    const isLiked = this.state.likes.includes(owner);
    let list = this.state.likes;
    if (isLiked) {
      this.setState({
        likesClass: "fa fa-thumbs-o-up fa-2x",
        likes: list.filter((element) => element !== owner),
      });
      await http.put(def.baseURL + "post/updatelike/" + id + "/0");
    } else if (!isLiked) {
      list.push(owner);
      this.setState({ likesClass: "fa fa-thumbs-up fa-2x", likes: [...list] });
      await http.put(def.baseURL + "post/updatelike/" + id + "/1");
    }
  };

  handleViewProfile = () => {
    localStorage.setItem("post", this.props.id);
    window.location = "/viewprofile";
  };

  renderEdit = () => {
    const { edit } = this.props;
    let { likes } = this.state;
    if (edit) {
      return (
        <React.Fragment>
          <i className="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
          <h5 className="likeMargin"> {likes.length}</h5>
          <i
            onClick={this.handleEdit}
            className="fa fa-pencil-square fa-2x editIcon "
            aria-hidden="true"
          ></i>
          <i
            onClick={() => this.props.onDelete(this.props.id)}
            className="fa fa-trash-o fa-2x deleteIcon"
            aria-hidden="true"
          ></i>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <i
            onClick={this.handleLike}
            className={this.state.likesClass}
            aria-hidden="true"
          ></i>
          <h5 className="likeMargin"> {likes.length}</h5>
          <Button
            onClick={this.handleViewProfile}
            className="ml-auto"
            variant="success"
          >
            See Artist
          </Button>
        </React.Fragment>
      );
    }
  };
  render() {
    let { file, name, description } = this.state;
    return (
      <Card bg={"dark"} text={"white"} style={{ width: "18rem" }}>
        <Card.Img style={{ width: "100%" }} variant="top" src={file} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className="buttons">{this.renderEdit()}</div>
        </Card.Body>
      </Card>
    );
  }
}

export default PostCard;
