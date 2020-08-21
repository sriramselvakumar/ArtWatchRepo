import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import http from "../axiosconfig/authaxios";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import def from "../default.json";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "../Components/Spinner";

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Jumbotron
          fluid
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
            height: "100vh",
          }}
        >
          <h1 className="text-center">Add your Profile Picture! </h1>
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
          <div className="text-center">
            <Link to="/createdescription">
              <Button className="mr-1" variant="primary">
                Upload
              </Button>

              <Button className="mr-1" variant="success">
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
