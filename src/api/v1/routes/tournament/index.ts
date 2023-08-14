import type { Elysia } from "elysia";
import team from "./team";
import tournament from "./tournament";
import tournamentWeek from "./tournament-week";

export default (app: Elysia) =>
  app.use(tournamentWeek).use(tournament).use(team);
