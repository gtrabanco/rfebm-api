import { getLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { getPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import { getWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../../libraries/response-schema-with-payload-schema";
import { mapTournamentMatchLive } from "./maps/map-tournament-match-live";
import { TournamentMatchLiveMappedResult } from "./schemas/tournament-match-live-mapped-result";

export default (app: Elysia) =>
  app.get(
    "/:tournamentId/:week/:matchId/live",
    async ({ params: { matchId, week, tournamentId }, set }) => {
      const tournamentData = await getWeekResults({ tournamentId, week });

      if (!tournamentData) {
        set.status = 204;
        return;
      }

      const previous = await getPrevious({ matchId });
      if (!previous) {
        set.status = 204;
        return;
      }

      const matchLiveDetails = await getLiveData({ matchId });
      if (!matchLiveDetails) {
        set.status = 204;
        return;
      }
      const result = mapTournamentMatchLive({
        previous,
        matchLiveDetails,
        tournamentData,
        matchId,
        week,
      });

      if (!result) {
        set.status = 204;
        return;
      }

      return result;
    },
    {
      params: t.Object(
        {
          tournamentId: t.Numeric({
            minimum: 1,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Tournament id",
            description: "You can get this id from /tournaments endpoint",
          }),
          week: t.Numeric({
            minimum: 1,
            maximum: 99,
            title: "Week of the match",
            description: 'Match Week ("Jornada" in spanish)',
          }),
          matchId: t.Numeric({
            minimum: 1,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Match Id",
            description: "The id of the match to get the current details of.",
          }),
        },
        {
          response: responseSchemaWithPayloadSchema(
            TournamentMatchLiveMappedResult,
          ),
          title: "Match live data",
          description: "Get the current details of a match.",
        },
      ),
    },
  );

// Test data:
// tournament: 1017116
// week: 1
// matchId: 1291587
