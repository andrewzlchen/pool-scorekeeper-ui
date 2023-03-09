import React from "react";
import GameSettings from "./game-settings/GameSettings";

const MatchGames = () => {
  return (
    <div className="games">
      <h1>Games</h1>

      <GameSettings
        date={"10/10/2021"}
        teamA={{
          id: "1",
          name: "Team A",
          players: [
            { id: "1", name: "Kool-aid Man" },
            { id: "2", name: "Capn' Crunch" },
          ],
        }}
        teamB={{
          id: "2",
          name: "Team B",
          players: [
            { id: "100", name: "John Doe" },
            { id: "101", name: "Jane Doe" },
          ],
        }}
      />
    </div>
  );
};
export default MatchGames;
