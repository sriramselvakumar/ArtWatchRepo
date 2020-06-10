import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import http from "../axiosconfig/authaxios";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import ArtWatchIcon from "../Images/ArtWatchIcon.png";
import "../CSS/Home.css";
import def from "../default.json";
import Button from "react-bootstrap/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      file: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    try {
      const response = await http.get(def.baseURL + "/getuser/me");
      this.setState({ firstName: response.data.firstName });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleFile = (e) => {
    let file = e.target.files[0];
    this.setState({ file: file });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let file = this.state.file;
    let formData = new FormData();
    formData.append("avatar", file);

    try {
      let response = await http.put(def.baseURL + "/getuser", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar showLogout={true} />
        <Jumbotron>
          <h1 className="Headings">
            Hey {this.state.firstName}, Add your Profile Picture{" "}
          </h1>
          <Image className="Icon" src={ArtWatchIcon} rounded />

          <div className="row">
            <div className="mx-auto">
              <Form>
                <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Your Profile Picture"
                    onChange={this.handleFile}
                  />
                </Form.Group>
                <Button variant="primary" onClick={this.onSubmit}>
                  Upload
                </Button>
              </Form>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Profile;
