import type { Elysia } from "elysia";
import matchId from "./[matchId]";

export default (app: Elysia) => app.group("/match", (app) => app.use(matchId));
