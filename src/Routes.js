import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Contactcreation from "./Component/Contactcreation";
import UserDashboard from "./Component/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import Contact from "./Component/Contact";
import ChatPage from "./Component/ChatPage";
import PageNotFound from "./PageNotFound";
import PasswordForget from "./Component/PasswordForget";
import "./style/cardStyle.css";
import PasswordResetPage from "./Component/PasswordResetPage";
import Video from "./Component/Video";
import PostSection from "./Component/PostSection"
import ChatToAnyOne from "./Component/ChatToAnyOne"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PostSection} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgetpassword" exact component={PasswordForget} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute
          path="/user/createContact"
          exact
          component={Contactcreation}
        />
        <PrivateRoute path="/user/contactpage" exact component={Contact} />
        <PrivateRoute
          path="/userchatPage/:secondUserId"
          exact
          component={ChatPage}
        />
        <PrivateRoute
          path="/chat"
          exact
          component={ChatToAnyOne}
        />
        <Route
          path="/user/password-reset"
          exact
          component={PasswordResetPage}
        />
        <PrivateRoute path="/videocall/:secondUserId" exact component={Video} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
