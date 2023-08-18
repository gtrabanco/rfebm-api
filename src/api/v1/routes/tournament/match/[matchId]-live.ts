import { getLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { getPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../../libraries/response-schema-with-payload-schema";
import { mapMatchLive } from "./maps/map-match-live";
import { MatchMappedResult } from "./schemas/match-mapped-result";

// TODO: Wip: This is a copy & paste from match/[matchId]/live endpoint so it has to be modified entirely
export default (app: Elysia) =>
  app.get(
    "/:tournamentId/:week/:matchId/live",
    async ({ params: { matchId }, set }) => {
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
      return mapMatchLive({ previous, matchLiveDetails });
    },
    {
      params: t.Object({
        tournamentId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Tournament id",
          description: "You can get this id from /tournaments endpoint",
        }),
        week: t.Optional(
          t.Union(
            [
              t.Numeric({
                minimum: 1,
                maximum: 99,
              }),
              t.TemplateLiteral("latest"),
            ],
            {
              title: "Week of the match",
              description:
                'You can use "latest" or empty to get latest match week as you see in RFEBM page. Important that if you are close to a match date probably you will have matches that are pendint to play.',
            },
          ),
        ),
        matchId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Match Id",
          description: "The id of the match to get the current details of.",
        }),
      }),
      response: responseSchemaWithPayloadSchema(MatchMappedResult),
      description: "Get the current details of a match.",
    },
  );
