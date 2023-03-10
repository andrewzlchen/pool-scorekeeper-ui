import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import urls from "../../common/urls";
import { useRealmApp } from "../../hooks/useRealmApp";

import * as Realm from "realm-web";
const {
  BSON: { ObjectId },
} = Realm;
import moment from "moment";

import Divider from "../../common/divider";
import { useTeamByCurrentUser } from "../../hooks/useTeam";
import usePlayer from "../../hooks/usePlayer";
import usePlayerStats from "../../hooks/usePlayerStats";
import divider from "../../common/divider";

const Container = styled.div`
  justify-self: center;
  text-align: center;
`;

const Card = styled.div`
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  box-shadow: 0px 1px 4px 0px #0000000d;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.div`
  background-color: #c0fae6;
  color: #00684a;
  padding: 8px;
  height: 40px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Matches = () => {
  const { currentUser } = useRealmApp();

  const navigate = useNavigate();

  const [previousMatchups, setPreviousMatchups] = React.useState<any[]>([]);
  const [upcomingMatchups, setUpcomingMatchups] = React.useState<any[]>([]);
  const { player, loading: playerLoading, error: playerError } = usePlayer();
  const {
    team,
    loading: teamLoading,
    error: teamError,
  } = useTeamByCurrentUser();

  const {
    playerStats,
    loading: playerStatsLoading,
    error: playerStatsError,
  } = usePlayerStats();

  // TODO: use useTeam()
  const mongo = currentUser.mongoClient("mongodb-atlas");

  const teamsCol = mongo.db("app").collection("teams");
  const teamMatchesCol = mongo.db("app").collection("team_matches");

  const fetchTeamDataForCurrentUser = async () => {
    return await teamsCol.findOne({ players: new ObjectId(currentUser.id) });
  };

  const fetchTeamMatchupsForTeam = async (teamName: string) => {
    return await teamMatchesCol.find({
      $or: [{ team1: teamName }, { team2: teamName }],
    });
  };

  React.useEffect(() => {
    fetchTeamDataForCurrentUser()
      .then((team) => {
        if (team) {
          fetchTeamMatchupsForTeam(team.name).then((matchupsRes) => {
            const upcomingMatchupsToSet: any[] = [];
            const previousMatchupsToSet: any[] = [];

            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);

            matchupsRes.forEach((matchup: any) => {
              const matchDate = new Date(matchup.ts * 1000);

              if (startOfToday < matchDate) {
                upcomingMatchupsToSet.push(matchup);
              } else {
                previousMatchupsToSet.push(matchup);
              }
            });

            setUpcomingMatchups(upcomingMatchupsToSet);
            setPreviousMatchups(previousMatchupsToSet);
          });
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const isLoading = playerLoading || teamLoading || playerStatsLoading;
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (!team) {
    <div>{player ? player.name : "Unnamed Pool Shark"} is not on a team</div>;
  }

  return (
    <Container className="w-4/5 max-w-md">
      <h1>{player ? player.name : "Unnamed Pool Shark"}</h1>
      {playerStats && (
        <h3>
          {playerStats.overall.wins} Win(s) • {playerStats.overall.losses}{" "}
          Loss(es)
        </h3>
      )}
      {team && <p>{team.name}</p>}
      <button
        className="btn btn-accent"
        onClick={async () => {
          await currentUser.logOut();
          navigate(urls.login());
        }}
      >
        Log out
      </button>
      <Divider />

      {playerError && (
        <div className="alert alert-error shadow-lg mb-5 w-full">
          Failed to get player: {playerError}
        </div>
      )}
      {teamError && (
        <div className="alert alert-error shadow-lg mb-5 w-full">
          Failed to get player team: {teamError}
        </div>
      )}
      {playerStatsError && (
        <div className="alert alert-error shadow-lg mb-5 w-full">
          Failed to get player stats: {playerStatsError}
        </div>
      )}
      {upcomingMatchups && (
        <div className="my-16">
          <h2 className="mb-5">Upcoming Matches</h2>
          {upcomingMatchups.map((match) => {
            const timestamp = moment(match.ts * 1000).format("LLLL");

            let opponent: string;
            if (match.team1 === team?.name) {
              opponent = match.team2;
            } else {
              opponent = match.team1;
            }
            return (
              <Card>
                <span className="flex flex-col items-start">
                  <p>{opponent}</p>
                  <p className="prose prose-slate">@ {timestamp}</p>
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(
                      urls.app().matches().games(match._id.toString()).list()
                    )
                  }
                >
                  Set Up
                </button>
              </Card>
            );
          })}
        </div>
      )}

      {previousMatchups && (
        <>
          <h2 className="mb-5">Previous Matches</h2>
          {previousMatchups.map((match) => {
            const timestamp = moment(match.ts * 1000).format("LLLL");

            // TODO use actual match data
            return (
              <Card>
                <span>{timestamp}</span>
                <Badge>WON 5-3</Badge>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default Matches;
