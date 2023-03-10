export default {
  login: () => "/login",
  signup: () => "/signup",
  app: () => {
    const appUrl = `/app`;
    return {
      matches: () => ({
        list: () => `${appUrl}/matches`,
        get: (matchId: string) => `${appUrl}/matches/${matchId}`,
        games: (matchId: string) => {
          const matchUrl = `${appUrl}/matches/${matchId}`;
          return {
            list: () => `${matchUrl}/games`,
            get: (gameId: string) => `${matchUrl}/games/${gameId}`,
          };
        },
      }),
    };
  },
};
