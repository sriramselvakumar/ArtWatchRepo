import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/Home";

import ProfilePic from "./Pages/ProfilePic";
import Profile from "./Pages/Profile";
import Description from "./Pages/Description";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import Feed from "./Pages/Feed";
import ProfileView from "./Pages/ViewProfile";
import Middleware from "./Pages/Middleware";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/createprofilepic" component={ProfilePic} />
          <Route path="/myprofile" component={Profile} />
          <Route path="/createdescription" component={Description} />
          <Route path="/createpost" component={Create} />
          <Route path="/edit" component={Edit} />
          <Route path="/feed" component={Feed} />
          <Route path="/viewprofile" component={ProfileView} />
          <Route path="/middleware" component={Middleware} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
