import { type Elysia } from "elysia";
import categories from "./routes/categories";
import championships from "./routes/championships";
import court from "./routes/court";
import courts from "./routes/courts";
import federation from "./routes/federation";
import federations from "./routes/federations";
import seasons from "./routes/seasons";
import tournament from "./routes/tournament";
import tournaments from "./routes/tournaments";

export const apiv1 = (app: Elysia) =>
  app
    .state("version", "v1.0.0")
    .get("", ({ request }) => ({
      routes: [
        `${request.url}/version`,
        `${request.url}/federations`,
        `${request.url}/federation/:id`,
        `${request.url}/seasons`,
        `${request.url}/categories`,
        `${request.url}/championships`,
        `${request.url}/tournaments`,
        `${request.url}/tournament/:id[/:week]`,
        `${request.url}/courts/:federationId`,
        `${request.url}/court/:courtId`,
      ],
    }))
    .get("/version", ({ store }) => ({ version: store.version }))
    .use(federations)
    .use(federation)
    .use(seasons)
    .use(categories)
    .use(championships)
    .use(tournaments)
    .use(tournament)
    .use(courts)
    .use(court);
