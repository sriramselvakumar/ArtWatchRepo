import React, { Component } from "react";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Navbar from "../Components/LogNavbar";
import "../CSS/Create.css";
import "../CSS/Home.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class EditPost extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    filename: "",
  };

  componentDidMount() {
    this.loadPost();
  }
  handleFile = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("painting", file);
    try {
      let response = await http.put(
        def.baseURL + "post/" + this.state.id,
        formData
      );

      this.setState({ filename: def.uploadsURL + response.data.filename });
    } catch (error) {
      console.log(error.message);
    }
  };
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  loadPost = async () => {
    const id = localStorage.getItem("postID");
    localStorage.removeItem("postID");
    const response = await http.get(def.baseURL + "post/" + id);
    const { name, description, filename } = response.data;
    this.setState({
      id,
      name,
      description,
      filename: def.uploadsURL + filename,
    });
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    try {
      window.location = "/myprofile";
      const { name, description, id } = this.state;
      let post = {
        name,
        description,
      };
      await http.put(def.baseURL + "post/update/" + id, post);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { name, description, filename } = this.state;
    return (
      <React.Fragment>
        <Navbar edit={true} />
        <Jumbotron>
          <div class="box">
            <h1 className="text-center"> Update Post </h1>
            <Image className="Icon" src={filename} rounded />
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.onChangeName}
              defaultValue={name}
              placeholder="Normal text"
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={this.onChangeDescription}
              as="textarea"
              defaultValue={description}
              rows="3"
            />
            <Form.File
              id="exampleFormControlFile1"
              label="Your Painting Picture"
              onChange={this.handleFile}
            />
            <Button onClick={this.handleUpdate} variant="success">
              Update
            </Button>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default EditPost;
