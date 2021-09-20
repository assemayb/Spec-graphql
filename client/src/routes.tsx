import React from "react";
import { Switch, Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Topics } from "./pages/Topics";
import { SignleTopicPage} from "./pages/SignleTopicPage";
import { Thread } from "./pages/Thread";
import { User } from "./pages/User";
import { Notifications} from "./pages/Notifications";


export const BaseRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/test" component={Test} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profiles/:username" component={User} />
      <Route path="/topics/:topicName" component={SignleTopicPage} />
      <Route exact path="/topics" component={Topics} />
      <Route path="/threads/:threadId" component={Thread} />
      <Route path="/notifications" component={Notifications} />
    </Switch>
  );
};
