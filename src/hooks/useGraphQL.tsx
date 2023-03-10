import React from "react";
import axios from "axios";
import { useRealmApp } from "./useRealmApp";

const useGraphQL = <T,>(query: string) => {
  const [results, setResults] = React.useState<T>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const realmApp = useRealmApp();

  React.useEffect(() => {
    const sendGraphQLRequest = async () => {
      if (!query) {
        return;
      }
      setError("");
      setLoading(true);
      try {
        const endpoint =
          "https://realm.mongodb.com/api/client/v2.0/app/table-runner-qzkyp/graphql";
        const res = await axios.post(
          endpoint,
          {
            query,
          },
          {
            headers: {
              Authorization: `Bearer ${realmApp.currentUser.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setResults(res.data.data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    sendGraphQLRequest();
  }, []);

  return { results, loading, error };
};

export default useGraphQL;
