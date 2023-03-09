import React from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Action, GameSettings, GameType } from "../../common/types";

import PoolBall from "./poolball";

interface Props {
  matchId: string;
  gameSettings: GameSettings;
}

const BallsContainer = styled.div`
  width: 500px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  row-gap: 25px;
`;

const GamePage = ({
  gameSettings: { playerA, playerB, gameType },
  matchId,
}: Props) => {
  const [inning, setInning] = React.useState(0);
  const [currPlayer, setCurrPlayer] = React.useState(playerA);
  const [numScratches, setNumScratches] = React.useState(0);
  const [numSafeties, setNumSafeties] = React.useState(0);
  const [balls, setBalls] = React.useState<boolean[]>([]);
  const [err, setErr] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);

  // push the state of the game as of the end of the previous turn. should be called upon ending the turn
  const pushGameState = async (action: Action) => {
    const endpointUrl =
      "https://data.mongodb-api.com/app/table-runner-qzkyp/endpoint/game_state/push";

    // game over conditions:
    // 1. 8-ball, scratch on 8
    // 2. 8-ball, prematurely potting the 8
    // 3. 8-ball, potting the 8
    // 3. 9-ball, potting the 9

    if (gameType === GameType.EightBall) {
      const didPotEight = balls[7];
      const oneThruSevenPotted = balls.slice(0, 8).every((potted) => potted);

      // loss conditions
      const prematurelyPottedEight = didPotEight && !oneThruSevenPotted;
      const scratchedOnEight = oneThruSevenPotted && action === Action.Scratch;
      // win conditions
      const wonProperly = didPotEight && oneThruSevenPotted;
      if (wonProperly || scratchedOnEight || prematurelyPottedEight) {
        setIsGameOver(true);
      }
    } else if (gameType === GameType.NineBall) {
      // 9ball win-condititions
      const didPotNine = balls[8];

      if (didPotNine) {
        setIsGameOver(true);
      }
    }

    const gameState = {
      inning,
      playerId: currPlayer.id,
      balls,
      action,
      isGameOver,
      matchId,
    };

    try {
      const res = await axios.post(endpointUrl, gameState);
      console.log(res);
    } catch (err) {
      const error = err as Error;
      setErr(`Failed to send game state to server: ${error.message}`);
    }
  };

  // determine whose turn it is depending on the current number of innings
  React.useEffect(() => {
    if (inning % 2 === 0) {
      setCurrPlayer(playerA);
      return;
    }
    setCurrPlayer(playerB);
  }, [inning]);

  // initialize the game balls depending on what type of game is being played
  React.useEffect(() => {
    const nineBalls = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    if (gameType === GameType.NineBall) {
      setBalls(nineBalls);
      return;
    }
    setBalls([...nineBalls, false, false, false, false, false, false]); // 8-ball
  }, []);

  return (
    <div className="game-page">
      <h1>Game page</h1>
      {err && <p>{err}</p>}
      <h2>{`${currPlayer.name}'s Turn'`}</h2>
      <BallsContainer className="poolballs">
        {balls.map((b, idx) => (
          <PoolBall
            num={idx + 1}
            potted={b}
            onClick={() => {
              const newBalls = [...balls];
              newBalls[idx] = !balls[idx];
              setBalls(newBalls);
            }}
          />
        ))}
      </BallsContainer>

      <div className="actions">
        <button
          className="next-turn"
          onClick={() => {
            setInning(inning + 1);
            pushGameState(Action.Turnover);
          }}
        >
          Next turn
        </button>
        <button
          className="scratch-btn"
          onClick={() => {
            setInning(inning + 1);
            setNumScratches(numScratches + 1);
            pushGameState(Action.Scratch);
          }}
        >
          Scratch
        </button>
        <button
          className="safety-btn"
          onClick={() => {
            setInning(inning + 1);
            setNumSafeties(numSafeties + 1);
            pushGameState(Action.Safety);
          }}
        >
          Safety
        </button>
      </div>
    </div>
  );
};

export default GamePage;
