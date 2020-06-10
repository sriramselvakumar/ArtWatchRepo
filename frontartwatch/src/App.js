import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import ProfilePic from "./Pages/ProfilePic";
import Profile from "./Pages/Profile";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/createprofilepic" component={ProfilePic} />
          <Route path="/myprofile" component={Profile} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
