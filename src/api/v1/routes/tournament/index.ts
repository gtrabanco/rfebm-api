import type { Elysia } from "elysia";
import tournament from "./tournament";
import tournamentWeek from "./tournament-week";

export default (app: Elysia) => app.use(tournamentWeek).use(tournament);
