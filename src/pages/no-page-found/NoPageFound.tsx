import React from "react";
import styled from "@emotion/styled";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(/src/assets/amsterdam.jpeg);
  background-repeat: no-repeat;
  background-position: center;

  color: white;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: space-around;
`;

const NoPageFoundPage = () => {
  return (
    <Background>
      <div className="">
        <h1>404 - No Page Found!</h1>
      </div>
    </Background>
  );
};

export default NoPageFoundPage;
