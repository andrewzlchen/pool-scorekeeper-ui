import React from "react";
import { Team } from "../common/types";
import { useRealmApp } from "./useRealmApp";
import { BSON } from "realm-web";
import useGraphQL from "./useGraphQL";

export const useTeamByCurrentUser = () => {
  const [error, setError] = React.useState("");
  const [team, setTeam] = React.useState<Team>();
  const [loading, setLoading] = React.useState(false);

  const realmApp = useRealmApp();
  const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
  const teamsCollection = mongo.db("app").collection("teams");

  React.useEffect(() => {
    const getTeam = async () => {
      setError("");
      try {
        setLoading(true);
        const res = await teamsCollection.findOne({
          players: new BSON.ObjectId(realmApp.currentUser.id),
        });
        setTeam(res);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  }, []);

  return { team, loading, error };
};

// TODO [nice-to-have] Make this hook accept a season to prevent it from returning teams from previous seasons
export const useTeams = () => {
  const [error, setError] = React.useState("");
  const [teams, setTeams] = React.useState<Team[]>();
  const [loading, setLoading] = React.useState(false);

  const realmApp = useRealmApp();
  const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
  const teamsCollection = mongo.db("app").collection("teams");

  React.useEffect(() => {
    const getTeam = async () => {
      setError("");
      try {
        setLoading(true);
        const res = await teamsCollection.find({});
        setTeams(res.data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  }, []);

  return { teams, loading, error };
};
