import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import "../CSS/Postcard.css";
import LikeIcon from "../Images/like.png";
import EditIcon from "../Images/pen.png";
import DeleteIcon from "../Images/x-button.png";

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLike = () => {
    console.log("liked");
  };
  render() {
    const { Name, Des, File, Likes } = this.props;
    return (
      <Card style={{ width: "301px" }}>
        <Card.Img
          style={{ width: "300px", height: "300px" }}
          variant="top"
          src={File}
        />
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
          <Card.Text>{Des}</Card.Text>
          <div className="buttons">
            <Image
              onClick={this.handleLike()}
              className="Icons"
              src={LikeIcon}
            />
            <h5 className="likeMargin"> {Likes} Likes</h5>
            <Image className="editIcon Icons" src={EditIcon} />
            <Image className="Icons deleteIcon" src={DeleteIcon} />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default PostCard;
