import React, { Component } from "react";
import Navbar from "../Components/LogNavbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import http from "../axiosconfig/authaxios";
import def from "../default.json";
import Image from "react-bootstrap/Image";
import "../CSS/Home.css";
import "../CSS/Create.css";
import Button from "react-bootstrap/Button";
class CreatePost extends Component {
  state = {
    id: "",
    filename: "",
    uploaded: false,
    name: "",
    description: "",
  };

  componentDidMount() {
    this.onMount();
  }

  componentWillUnmount() {
    console.log("we are going to delete");
    this.onUnmount();
  }

  onUnmount = async () => {
    if (!this.state.uploaded) {
      await http.delete(def.baseURL + "post/" + this.state.id);
    }
  };

  onMount = async () => {
    const post = {
      name: "",
      description: "",
      filename: "Default.png",
      date: new Date(),
    };
    try {
      const response = await http.post(def.baseURL + "post", post);
      this.setState({
        id: response.data._id,
        filename: def.uploadsURL + response.data.filename,
      });
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

  handleCreate = async (e) => {
    e.preventDefault();
    try {
      window.location = "/myprofile";
      const { name, description, id } = this.state;
      const post = {
        name: name,
        description: description,
      };
      await http.put(def.baseURL + "post/final/" + id, post);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  render() {
    return (
      <React.Fragment>
        <Navbar create={true} />
        <Jumbotron>
          <div className="box">
            <h1 className="text-center">CreatePost</h1>
            <Image className="Icon" src={this.state.filename} rounded />
            <Form>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={this.onChangeName}
                placeholder="Normal text"
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={this.onChangeDescription}
                as="textarea"
                rows="3"
              />
              <Form.File
                id="exampleFormControlFile1"
                label="Choose the picture"
                onChange={this.handleFile}
              />
            </Form>
            <div className="mt-2">
              <Button onClick={this.handleCreate} variant="success">
                Create
              </Button>

              <Button className="ml-1" variant="danger">
                Cancel
              </Button>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default CreatePost;
