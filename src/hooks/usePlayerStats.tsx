import React from "react";
import { useRealmApp } from "./useRealmApp";
import { BSON } from "realm-web";
import { PlayerStats } from "../common/types";

const usePlayerStats = () => {
  const [error, setError] = React.useState("");
  const [playerStats, setPlayerStats] = React.useState<PlayerStats>();
  const [loading, setLoading] = React.useState(false);

  const realmApp = useRealmApp();
  const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
  const playerStatsCollection = mongo.db("app").collection("player_stats");

  React.useEffect(() => {
    const getTeam = async () => {
      setError("");
      try {
        setLoading(true);
        const res = await playerStatsCollection.findOne({
          player: new BSON.ObjectId(realmApp.currentUser.id),
        });
        setPlayerStats(res);
        console.log(res);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  }, []);

  return { playerStats, loading, error };
};

export default usePlayerStats;
