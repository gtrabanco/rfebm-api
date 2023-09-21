import type { Elysia } from "elysia";
import matchId from "./live/[matchId]";

export default (app: Elysia) => app.group("/match", (app) => app.use(matchId));
