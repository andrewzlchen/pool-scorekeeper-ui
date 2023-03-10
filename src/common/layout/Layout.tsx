import React, { PropsWithChildren } from "react";
import { redirect } from "react-router-dom";
import { useRealmApp } from "../../hooks/useRealmApp";
import urls from "../urls";

const Layout = ({ children }: PropsWithChildren) => {
  const { currentUser } = useRealmApp();
  if (!currentUser) {
    // User did not sign in yet
    redirect(urls.login());
  }

  return <div>{children}</div>;
};

export default Layout;
