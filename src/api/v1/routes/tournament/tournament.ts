import { getAllMatches } from "@gtrabanco/bun-rfebm-scraper-library/get-all-matches";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../libraries/response-schema-with-payload-schema";
import { mapTournamentMatchesData } from "./data-maps/map-tournament-matches-data";
import { Match } from "./schemas/match";
import { TeamInMatch } from "./schemas/team-in-match";

const payloadSchema = t.Object({
  teams: t.Array(TeamInMatch),
  weeks: t.Record(t.Number(), t.String()),
  calendar: t.Array(Match),
});

export default (app: Elysia) =>
  app.get(
    "/tournament/:tournamentId",
    async ({ params: { tournamentId }, set }) => {
      const data = await getAllMatches({
        tournamentId,
      });

      if (!data || data?.matches.length === 0) {
        set.status = 204;
        return;
      }

      const payload = mapTournamentMatchesData(data);

      return payload;
    },
    {
      params: t.Object({
        tournamentId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Tournament id",
          description: "You can get this id from /tournaments endpoint",
        }),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
