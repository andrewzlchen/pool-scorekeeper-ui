import axios from "axios";
import React from "react";
import { Team } from "../common/types";

export const useTeam = (id: string) => {
  const [error, setError] = React.useState("");
  const [team, setTeam] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getTeam = async () => {
      try {
        const endpointUrl = `${id}`;
        setLoading(true);
        const res = await axios.get(endpointUrl);
        setTeam(res.data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  });

  return { team, loading, error };
};

export const useTeams = () => {
  const [error, setError] = React.useState("");
  const [teams, setTeams] = React.useState<Team[]>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getTeam = async () => {
      try {
        const endpointUrl = "";
        setLoading(true);
        const res = await axios.get(endpointUrl);
        setTeams(res.data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  });

  return { teams, loading, error };
};
