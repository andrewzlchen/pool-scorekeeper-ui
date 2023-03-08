import React from "react";
import styled from "@emotion/styled";

import PoolBall from "./poolball";

type Player = {
  name: string;
};

export enum GameType {
  EightBall = 8,
  NineBall = 9,
}

interface Props {
  gameType: GameType;
  playerA: Player;
  playerB: Player;
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

const GamePage = ({ playerA, playerB, gameType }: Props) => {
  const [inning, setInning] = React.useState(0);
  const [numScratches, setNumScratches] = React.useState(0);
  const [numSafeties, setNumSafeties] = React.useState(0);
  const [balls, setBalls] = React.useState<boolean[]>([]);

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
      <h2>{`${inning % 2 === 0 ? playerA.name : playerB.name}'s Turn'`}</h2>
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
        <button className="next-turn" onClick={() => setInning(inning + 1)}>
          Next turn
        </button>
        <button
          className="scratch"
          onClick={() => {
            setInning(inning + 1);
            setNumScratches(numScratches + 1);
          }}
        >
          Scratch
        </button>
        <button
          className="next-turn"
          onClick={() => {
            setInning(inning + 1);
            setNumSafeties(numSafeties + 1);
          }}
        >
          Safety
        </button>
      </div>
    </div>
  );
};

export default GamePage;
