import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import http from "../axiosconfig/authaxios";
import Card from "react-bootstrap/Card";
import def from "../default.json";
class Description extends Component {
  state = {
    description: "",
  };

  onChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ description: event.target.value });
      if (this.state.description !== "") {
        const description = this.state.description;
        await http.put(def.baseURL + "getuser/updatedescription", {
          description: description,
        });
      }
      window.location = "/myprofile";
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { description } = this.state;
    return (
      <React.Fragment>
        <Navbar showLogout={true} />
        <Jumbotron
          fluid
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(22,20,69,1) 0%, rgba(17,17,115,1) 42%, rgba(0,144,203,1) 100%)",
            minHeight: "100vh",
          }}
        >
          <h1 style={{ color: "white" }} className="text-center">
            {" "}
            Please add a description of yourself
          </h1>
          <Form
            className="mx-auto"
            style={{ width: "50%", marginLeft: "15%", marginRight: "5%" }}
          >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ color: "white" }}>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={this.onChange}
                as="textarea"
                rows="3"
              />
            </Form.Group>
          </Form>

          <div className="text-center">
            <Button onClick={this.onSubmit} className="mr-1" variant="success">
              Add Description
            </Button>
            <Link to="/myprofile">
              <Button variant="primary">Skip Step</Button>
            </Link>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Description;
