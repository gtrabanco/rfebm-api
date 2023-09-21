import { type Context, Elysia, t } from "elysia";
import court from "./court";
import courts from "./courts";
import federation from "./federation";
import federations from "./federations";
import match from "./match";
import tournament from "./tournament";

export const apiv2 = new Elysia();
apiv2
  .state("version", "v2.0.0")
  .get("", ({ request }: Context) => ({
    routes: [
      `${request.url}/version`,
      `${request.url}/federations`,
      `${request.url}/federation/:id`,
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
  .use(tournament)
  .use(courts)
  .use(court)
  .use(match);
