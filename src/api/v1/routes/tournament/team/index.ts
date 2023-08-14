import {
  GetTeam,
  getTeam,
} from "@gtrabanco/bun-rfebm-scraper-library/get-team";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../../libraries/response-schema-with-payload-schema";
import { mapTeamData } from "./maps/map-team-data";
import { TeamInTeam } from "./schemas/team-in-team";

export default (app: Elysia) =>
  app.get(
    "/tournament/:tournamentId/team/:teamId",
    async ({ params: { teamId, tournamentId }, set }) => {
      const data: GetTeam | undefined = await getTeam({ teamId, tournamentId });
      if (!data) {
        set.status = 204;
        return;
      }

      return mapTeamData(data);
    },
    {
      params: t.Object({
        teamId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
        }),
        tournamentId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
        }),
      }),
      response: responseSchemaWithPayloadSchema(TeamInTeam),
    },
  );
