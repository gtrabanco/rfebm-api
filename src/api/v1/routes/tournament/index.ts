import type { Elysia } from "elysia";
import MatchIdLive from "./match/[matchId]-live";
import team from "./team";
import tournament from "./tournament";
import tournamentWeek from "./tournament-week";

export default (app: Elysia) =>
  app.group("/tournament", (app) =>
    app.use(tournamentWeek).use(tournament).use(team).use(MatchIdLive),
  );
