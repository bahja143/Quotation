import React from "react";
import { Redirect } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isLoggedIn = localStorage["token"] ? true : false;

  if (!isLoggedIn) {
    return <Redirect to="/auth/signin" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
