import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

import Divider from "../../common/divider/Divider";
import useTeamMatch from "../../hooks/useTeamMatch";

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

const Match = () => {
  const [matchups, setMatchups] = React.useState();
  const { match, loading: matchLoading, error: matchError } = useTeamMatch();

  const [selectedMatch, setSelectedMatch] = React.useState<number>();
  const [leftPlayerId, setLeftPlayerId] = React.useState<string>();
  const [rightPlayerId, setRightPlayerId] = React.useState<string>();

  const onSubmitMatchup = () => {
    // TODO push data to app to create the new matchup and then navigate to game page
  };

  if (matchLoading) {
    return <h2>Loading...</h2>;
  }

  const hasError = matchError;
  if (hasError) {
    return (
      <>
        {matchError && (
          <div className="alert alert-error shadow-lg mb-5 w-full">
            Failed to get match: {matchError}
          </div>
        )}
      </>
    );
  }
  // if we get here, match, leftTeam and rightTeam should all exist
  return (
    <Container className="w-4/5 max-w-md">
      <>
        <h1>{moment(match?.ts || 0 * 1000).format("LLLL")}</h1>
        <h3 className="">
          {match?.team1?.name} vs. {match?.team2?.name}
        </h3>

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
                    {match?.team1?.players.map((player) => (
                      <option value={player._id}>{player.name}</option>
                    ))}
                  </select>

                  <span>{match?.team1?.name}</span>
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
                    {match?.team2?.players.map((player) => (
                      <option value={player._id}>{player.name}</option>
                    ))}
                  </select>
                  <span>{match?.team2?.name}</span>
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
      </>
    </Container>
  );
};
export default Match;
