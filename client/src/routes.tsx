import React from "react";
import { Switch, Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Topics } from "./pages/Topics";

export const BaseRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/test" component={Test} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/topics" component={Topics} />
    </Switch>
  );
};
