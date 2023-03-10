import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useRealmApp } from "../../hooks/useRealmApp";
import urls from "../../common/urls";
import BackArrow from "../../common/back-arrow";

const Background = styled.div`
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const App = () => {
  const { currentUser } = useRealmApp();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate(urls.login());
  }
  return (
    <Background className="w-screen h-screen p-20">
      <Outlet />
    </Background>
  );
};

export default App;
