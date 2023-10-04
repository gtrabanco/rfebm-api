import type { Elysia } from "elysia";
import MatchIdLive from "./match/[matchId]-live";
import team from "./team";
import tournamentWeek from "./tournament-week";
import tournament from "./tournament";

export default (app: Elysia) =>
  app.group("/tournament", (app) =>
    app.use(tournamentWeek).use(team).use(MatchIdLive).use(tournament),
  );
