import React from "react";
import styled from "@emotion/styled";

import GameSettings from "./game-settings/GameSettings";
import Divider from "../../common/divider/Divider";
import divider from "../../common/divider";
import { Player } from "../../common/types";

const Container = styled.div`
  width: 80%;
`;

const Card = styled.div`
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  box-shadow: 0px 1px 4px 0px #0000000d;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyPlayerIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  vertical-align: middle;
  font-size: 24px;
  background-color: white;
  color: black;
  border: #d9d9d9 solid 1px;
  text-align: center;
`;
// TODO wire up real data
const Match = () => {
  const [selectedMatch, setSelectedMatch] = React.useState<
    number | undefined
  >();

  const [leftPlayerOpts, setLeftPlayerOpts] = React.useState<Player[]>([]);
  const [rightPlayerOpts, setRightPlayerOpts] = React.useState<Player[]>([]);

  const [leftPlayerId, setLeftPlayerId] = React.useState("");
  const [rightPlayerId, setRightPlayerId] = React.useState("");

  React.useEffect(() => {
    // TODO Load the 2 player teams
    setLeftPlayerOpts([]);
    setRightPlayerOpts([]);
  }, []);

  const onSubmitMatchup = () => {
    // TODO push data to app to create the new matchup and then navigate to game page
  };

  return (
    <Container className="w-4/5 max-w-md">
      <h1>March 7</h1>
      <h3>MonGods vs. Team 2</h3>

      <Divider />

      <h3>Match 1</h3>
      <Card
        onClick={() => {
          setSelectedMatch(1);
        }}
      >
        <label htmlFor="game-settings-modal">{"+ Select Players"}</label>
      </Card>
      <h3>Match 2</h3>
      <Card
        onClick={() => {
          setSelectedMatch(2);
        }}
      >
        <label htmlFor="game-settings-modal">{"+ Select Players"}</label>
      </Card>
      <h3>Match 3</h3>
      <Card
        onClick={() => {
          setSelectedMatch(3);
        }}
      >
        <label htmlFor="game-settings-modal">{"+ Select Players"}</label>
      </Card>
      <h3>Match 4</h3>
      <Card
        onClick={() => {
          setSelectedMatch(4);
        }}
      >
        <label htmlFor="game-settings-modal">{"+ Select Players"}</label>
      </Card>

      <div>
        <input
          type="checkbox"
          id="game-settings-modal"
          className="modal-toggle"
        />
        <label htmlFor="game-settings-modal" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="game-settings-modal">
            <h3 className="text-lg font-bold">
              Match {selectedMatch} - Choose Players
            </h3>
            <div className="flex items-center justify-around my-5">
              <div className="flex flex-col items-center">
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={leftPlayerId}
                  onClick={(e) => {
                    setLeftPlayerId(e.target.value);
                  }}
                >
                  {leftPlayerOpts.map((player) => (
                    <option value={player.id}>{player.name}</option>
                  ))}
                </select>

                <span>MonGods</span>
              </div>
              <span>{" VS. "}</span>
              <div className="flex flex-col items-center">
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={rightPlayerId}
                  onChange={(e) => {
                    setRightPlayerId(e.target.value);
                  }}
                >
                  {rightPlayerOpts.map((player) => (
                    <option value={player.id}>{player.name}</option>
                  ))}
                </select>
                <span>Team 2</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={onSubmitMatchup}>
                Submit
              </button>
            </div>
          </label>
        </label>
      </div>
    </Container>
  );
};
export default Match;
