import { Context, Elysia, t } from "elysia";
import categories from "./categories";
import championships from "./championships";
import court from "./court";
import courts from "./courts";
import federation from "./federation";
import federations from "./federations";
import match from "./match";
import seasons from "./seasons";
import tournament from "./tournament";
import tournaments from "./tournaments";

export const apiv1 = new Elysia({ prefix: "/v1", name: "apiv1", scoped: true })
  .state("version", () => "v1.0.0" as string)
  .get("", ({ request }: Context) => ({
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
      `${request.url}/match/:matchId`,
      `${request.url}/tournament/:tournamentId/team/:teamId`,
    ],
  }))
  .get(
    "/version",
    ({ store: { version } }: { store: { version: string } }) => ({ version }),
    {
      response: t.Object({ version: t.String() }),
    },
  )
  .use(federations)
  .use(federation)
  .use(seasons)
  .use(categories)
  .use(championships)
  .use(tournaments)
  .use(tournament)
  .use(courts)
  .use(court)
  .use(match);
