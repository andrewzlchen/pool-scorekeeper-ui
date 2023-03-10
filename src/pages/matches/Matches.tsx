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
  const [isLoadingTeamInfo, setIsLoadingTeamInfo] = React.useState(true);

  const [player, setPlayer] = React.useState<any>(null);
  const [isLoadingPlayer, setIsLoadingPlayer] = React.useState(true);

  const [playerStats, setPlayerStats] = React.useState<any>(null);
  const [isLoadingPlayerStats, setIsLoadingPlayerStats] = React.useState(true);


  // TODO: use useTeam()
  const mongo = currentUser.mongoClient('mongodb-atlas');

  const teamsCol = mongo.db('app').collection('teams');
  const teamMatchesCol = mongo.db('app').collection('team_matches');
  const playerStatsCol = mongo.db('app').collection('player_stats');
  const playersCol = mongo.db('app').collection('players');

  const fetchTeamDataForCurrentUser = async () => {
    return await teamsCol.findOne({ "players": new ObjectId(currentUser.id) });
  };

  const fetchTeamMatchupsForTeam = async (teamName: string) => {
    return await teamMatchesCol.find({ "$or": [{"team1": teamName}, {"team2": teamName}] });
  };

  const fetchPlayerForCurrentUser = async () => {
    return await playersCol.findOne({ "_id": new ObjectId(currentUser.id) });
  };

  const fetchPlayerStatsForCurrentUser = async () => {
    return await playerStatsCol.findOne({ "player": new ObjectId(currentUser.id) });
  };

  React.useEffect(() => {
    fetchPlayerForCurrentUser()
      .then((playerRes) => {
        setPlayer(playerRes);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        setIsLoadingPlayer(false);
      });

    fetchPlayerStatsForCurrentUser()
      .then((playerStatsRes) => {
        setPlayerStats(playerStatsRes);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {
        setIsLoadingPlayerStats(false);
      });

    fetchTeamDataForCurrentUser()
      .then((team) => {
        if (team) {
          fetchTeamMatchupsForTeam(team.name)
            .then((matchupsRes) => {
              const upcomingMatchupsToSet: any[] = [];
              const previousMatchupsToSet: any[] = [];

              const startOfToday = new Date();
              startOfToday.setHours(0,0,0,0);

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
      })
      .finally(() => {
        setIsLoadingTeamInfo(false);
      });
  }, []);

  const getUpcomingMatches = () => {
    return upcomingMatchups.map((match) => {
      const timestamp = moment(match.ts * 1000).format('LLLL');

      return(
        <Card>
          <span>{timestamp}</span>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(urls.app().matches().games("testMatch").list())
            }
          >
            Set Up
          </button>
        </Card>
      );
    });
  }

  const getPreviousMatches = () => {
    return previousMatchups.map((match) => {
      const timestamp = moment(match.ts * 1000).format('LLLL');

      // TODO use actual match data
      return(
        <Card>
          <span>{timestamp}</span>
          <Badge>WON 5-3</Badge>
        </Card>
      );
    });
  }

  const isLoading = isLoadingPlayer || isLoadingPlayerStats || isLoadingTeamInfo;

  // TODO add in ability to set name and keep track of W/L
  return isLoading ? undefined : (
    <Container className="w-4/5 max-w-md">
      <h1>{player ? player.name : 'Unnamed Pool Shark'}</h1>
      {playerStats && (<h3>{playerStats.overall.wins} Wins • {playerStats.overall.losses} Loss</h3>)}
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
      {upcomingMatchups && (
        <div className="my-16">
          <h2 className="mb-5">Upcoming Matches</h2>
          {getUpcomingMatches()}
        </div>
      )}

      {previousMatchups && (
        <>
          <h2 className="mb-5">Previous Matches</h2>
          {getPreviousMatches()}
        </>
      )}
    </Container>
  );
};

export default Matches;
