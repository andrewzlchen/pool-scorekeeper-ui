import React from "react";
import { useRealmApp } from "./useRealmApp";
import { BSON } from "realm-web";
import { Player } from "../common/types";

const usePlayer = () => {
  const [error, setError] = React.useState("");
  const [player, setPlayer] = React.useState<Player>();
  const [loading, setLoading] = React.useState(false);

  const realmApp = useRealmApp();
  const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
  const playersCollection = mongo.db("app").collection("players");

  React.useEffect(() => {
    const getTeam = async () => {
      setError("");
      try {
        setLoading(true);
        const res = await playersCollection.findOne({
          _id: new BSON.ObjectId(realmApp.currentUser.id),
        });
        setPlayer(res);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeam();
  }, []);

  return { player, loading, error };
};

export default usePlayer;
