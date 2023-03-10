import React from "react";
import { useRouteError } from "react-router-dom";
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

const ErrorPage = ({ error }: { error: string }) => {
  let routeError = useRouteError();
  return (
    <Background>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <>
              <h1 className="text-5xl font-bold">{error}</h1>
              {routeError && <p className="py-6">{`${routeError}`}</p>}
            </>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ErrorPage;
