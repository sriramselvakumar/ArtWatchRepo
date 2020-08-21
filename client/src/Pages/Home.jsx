import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ArtWatchIcon from "../Images/ArtWatchIcon.png";

import "../CSS/Home.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Navbar from "../Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
const HomePage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <React.Fragment>
      <Navbar showLogin={true} showRegister={true} showLogout={false} />
      <Jumbotron
        fluid
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
          minHeight: "100vh",
        }}
      >
        <Image className="Icon" src={ArtWatchIcon} />

        <h1 className="Headings">Welcome To ArtWatch</h1>

        <CardDeck style={{ "margin-left": "15px", "margin-right": "15px" }}>
          <Card
            bg="dark"
            text="white"
            className="ml-2"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title className="cardText">
                Post Your Own Artwork
              </Card.Title>
              <Card.Text className="cardText">
                ArtWatch allows you to add photos and descriptions of your art
                show that you can spectate and share with your family and
                friends anytime you please
              </Card.Text>
              <div className="text-center">
                <Button onClick={() => loginWithRedirect()} variant="success">
                  Post Your Art
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card
            bg="dark"
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title className="cardText">Explore Our Feed</Card.Title>
              <Card.Text className="cardText">
                ArtWatch provides you with a feed of the artworks by our
                community of artists in a deck of cards! Feel free to explore
                and like the artworks created by our artistic users
              </Card.Text>
              <div className="text-center">
                <Button onClick={() => loginWithRedirect()} variant="success">
                  Explore ArtWork Feed
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card
            bg="dark"
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title className="cardText">Become A Celebrity</Card.Title>
              <Card.Text className="cardText">
                We encourage our community members to get their art on by giving
                them a Celebrity Badge once they cross 5 followers. What are you
                waiting for? Get Started on becoming a Celebrity today!!
              </Card.Text>
              <div className="text-center">
                <Button onClick={() => loginWithRedirect()} variant="success">
                  Become A Celebrity
                </Button>
              </div>
            </Card.Body>
          </Card>
        </CardDeck>
      </Jumbotron>
    </React.Fragment>
  );
};

export default HomePage;
