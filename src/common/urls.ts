export default {
  login: () => "/login",
  signup: () => "/signup",
  matches: () => ({
    list: () => `/matches`,
    get: (matchId: string) => `/matches/${matchId}`,
    games: (matchId: string) => ({
      list: () => `/matches/${matchId}/games`,
      get: (gameId: string) => `/matches/${matchId}/games/${gameId}`,
    }),
  }),
};
