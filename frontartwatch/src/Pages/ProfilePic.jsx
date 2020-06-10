import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import http from "../axiosconfig/authaxios";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import def from "../default.json";
import Button from "react-bootstrap/Button";

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      file: "",
      fileName: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    try {
      let response = await http.get(def.baseURL + "getuser/me");
      this.setState({
        firstName: response.data.firstName,
        fileName: def.uploadsURL + response.data.profilePictureName,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleFile = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("avatar", file);

    try {
      let response = await http.put(def.baseURL + "getuser", formData);
      this.setState({
        fileName: def.uploadsURL + response.data.profilePictureName,
      });
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
            Hey {this.state.firstName},Please Add your Profile Picture!{" "}
          </h1>
          <Image className="Icon" src={this.state.fileName} rounded />

          <div className="row">
            <div className="Icon">
              <Form>
                <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Your Profile Picture"
                    onChange={this.handleFile}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="text-center ">
            <Link to="/myprofile">
              <Button
                className="text-center mr-1"
                variant="primary"
                onClick={this.onSubmit}
              >
                Upload
              </Button>

              <Button
                onClick={this.onSkip}
                className="text-center mr-1"
                variant="success"
              >
                Skip Step
              </Button>
            </Link>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default ProfilePic;
