import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import urls from "../../common/urls";
import { useRealmApp } from "../../hooks/useRealmApp";

const Container = styled.div`
  justify-self: center;
  text-align: center;
`;

const Card = styled.div`
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  box-shadow: 0px 1px 4px 0px #0000000d;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.div`
  background-color: #c0fae6;
  color: #00684a;
  padding: 8px;
  height: 40px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const upcomingMatches = true;
const previousMatches = true;
const Matches = () => {
  const { currentUser } = useRealmApp();

  const navigate = useNavigate();

  // TODO wire up actual match data
  return (
    <Container className="w-4/5 max-w-md">
      <h1>Andrew C.</h1>
      <h3>Rank 4 • 3 Wins • 1 Loss</h3>
      <button
        className="btn btn-accent"
        onClick={async () => {
          await currentUser.logOut();
          navigate(urls.login());
        }}
      >
        Log out
      </button>
      <hr className="mb-16" />
      {upcomingMatches && (
        <div className="mb-16">
          <h2 className="mb-5">Upcoming Match</h2>
          <Card>
            <span>March 7</span>
            <button
              className="btn btn-primary"
              onClick={() => navigate(urls.app().matches().get("foobar"))}
            >
              Set Up
            </button>
          </Card>
        </div>
      )}

      {previousMatches && (
        <>
          <h2 className="mb-5">Previous Matches</h2>
          <Card>
            <span>February 21</span>
            <Badge>WON 5-3</Badge>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Matches;
