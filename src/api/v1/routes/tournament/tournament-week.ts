import {
  getWeekResults,
  WeekResultsPageParams,
} from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../libraries/response-schema-with-payload-schema";
import { mapTournamentsWeekResultsData } from "./data-maps/map-tournament-week-results-data";
import { Match } from "./schemas/match";
import { TeamInMatch } from "./schemas/team-in-match";

const payloadSchema = t.Object(
  {
    teams: t.Array(TeamInMatch),
    matches: t.Array(Match),
  },
  {
    title: "Tournament week results",
    description: `The results of a week or whatever data that is available about the matches in the general tournament page.`,
  },
);

export default (app: Elysia) =>
  app.get(
    "/tournament/:tournamentId/:week",
    async ({ params, set }) => {
      const week = params.week;
      const tournamentId = params.tournamentId;

      if (week) {
        const params: WeekResultsPageParams = {};
        if (week !== "latest") {
          params.week = week;
        }

        const json = await getWeekResults({
          tournamentId,
        });

        if (!json || json?.results.length === 0) {
          set.status = 204;
          return;
        }

        return mapTournamentsWeekResultsData(json);
      }
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
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
