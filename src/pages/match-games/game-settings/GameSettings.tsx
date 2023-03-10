import React from "react";
import { useNavigate } from "react-router-dom";

import { GameType, Player, Team, SinglesMatch } from "../../../common/types";
import urls from "../../../common/urls";
import useMatch from "../../../hooks/useMatch";

interface Props {
  teamA: Team;
  teamB: Team;
  date: string;
}

const GameSettingsPage = ({ teamA, teamB }: Props) => {
  const navigate = useNavigate();

  const { match, setMatch } = useMatch();

  const [playerA, setPlayerA] = React.useState<Player>();
  const [playerB, setPlayerB] = React.useState<Player>();
  const [gameType, setGameType] = React.useState<string>(GameType.EightBall);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (teamA.players.length > 0) {
      setPlayerA(teamA.players[0]);
    }
    if (teamB.players.length > 0) {
      setPlayerB(teamB.players[0]);
    }
  }, []);

  const onChangePlayer = (
    players: Player[],
    id: string,
    setter: (player?: Player) => void
  ) => {
    setter(players.find((p) => p.id === id));
  };

  const onStartMatch = () => {
    if (playerA === undefined || playerB === undefined) {
      setError(`players must be defined\nA: ${playerA}, B: ${playerB}`);
      return;
    }

    const newMatch: SinglesMatch = {
      ...match,
      settings: { playerA, playerB, gameType: gameType as GameType },
      games: [],
      id: "testmatch", //TODO get match id from router
    };
    setMatch(newMatch);
    if (match) {
      navigate(urls.app().matches().games(match.id).list());
    }
  };

  return (
    <div className="game-settings">
      <h1>Game settings page</h1>
      {error && <p>{error}</p>}

      <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
        <option value={GameType.EightBall}>8-ball</option>
        <option value={GameType.NineBall}>9-ball</option>
      </select>
      <select
        value={playerA?.id}
        onChange={(e) =>
          onChangePlayer(teamA.players, e.target.value, setPlayerA)
        }
      >
        {teamA.players.map((player) => (
          <option key={player.name} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
      <select
        value={playerB?.id}
        onChange={(e) =>
          onChangePlayer(teamB.players, e.target.value, setPlayerB)
        }
      >
        {teamB.players.map((player) => (
          <option key={player.name} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>

      <button onClick={onStartMatch}>Start Match</button>
    </div>
  );
};

export default GameSettingsPage;
