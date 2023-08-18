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
    weeks: t.Optional(
      t.Object({
        current: t.Numeric({
          minimum: 1,
          maximum: 99,
        }),
        total: t.Numeric({
          minimum: 1,
          maximum: 99,
        }),
      }),
    ),
  },
  {
    title: "Tournament week results",
    description: `The results of a week or whatever data that is available about the matches in the general tournament page.`,
  },
);

export default (app: Elysia) =>
  app.get(
    "/:tournamentId/:week/matches",
    async ({ params, set }) => {
      const week = params.week;
      const tournamentId = params.tournamentId;

      if (week) {
        const params: WeekResultsPageParams = {
          tournamentId,
        };
        if (week && week !== "latest") {
          params.week = week;
        }

        const data = await getWeekResults(params);

        if (!data || data?.results.length === 0) {
          set.status = 204;
          return;
        }

        return mapTournamentsWeekResultsData(data);
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
        week: t.Union(
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
            default: "latest",
          },
        ),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
