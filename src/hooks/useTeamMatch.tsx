import React from "react";
import { useParams } from "react-router-dom";
import { TeamMatch } from "../common/types";
import useGraphQL from "./useGraphQL";

const useTeamMatch = () => {
  const { matchid } = useParams();

  const query = `
query {
  team_match(query:{_id: "${matchid}"}) {
    ts
    team1 {
      name
      players{
        _id
        name
      }
    }
    team2 {
      name
      players {
        _id
        name
      }
    }
    singles_matches {
      _id
      player1 {
        name
        _id
      }
      player2 {
        name
        _id
      }
    }
  }
}
  `;
  const { results, loading, error } = useGraphQL<{ team_match: TeamMatch }>(
    query
  );

  return { match: results?.team_match, loading, error };
};

export default useTeamMatch;
