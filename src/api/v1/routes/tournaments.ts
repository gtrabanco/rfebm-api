import {
  getWeekResults,
  WeekResultsPageParams,
} from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { MINIMUM_SESION_ID, NATIONAL_FEDERATION_ID } from "../../../constants";
import { getCurrentSeasonId } from "../../../library/get-current-season-id";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { responseWithErrors } from "../libraries/response-with-errors";
import { optionSchema } from "../schemas/select-options-schema";

const payloadSchema = t.Array(optionSchema);

payloadSchema.title = "Tournaments";
payloadSchema.description = `Get a list of all available tournaments.`;

export default (app: Elysia) =>
  app.get(
    "/tournaments",
    async ({ set, query }) => {
      const federationId = query.federationId;
      const subfederationId = query.subfederationId;
      const seasonId = query.seasonId;
      const categoryId = query.categoryId;
      const championshipId = query.championshipId;
      if (
        (federationId && isNaN(federationId)) ||
        (subfederationId && isNaN(subfederationId)) ||
        (seasonId && isNaN(seasonId) && seasonId < 1819 && seasonId > 2100) ||
        (categoryId && isNaN(categoryId)) ||
        (championshipId && isNaN(championshipId))
      ) {
        return responseWithErrors(
          [
            "federationId, subfederationId, seasonId, categoryId and championshipId must be valid numbers",
            "seasonId must be a number equal or bigger than 1819 and lower than 2100. There are no data below season 18/19 in RFEBM page",
          ],
          422,
        );
      }

      const federationParams: WeekResultsPageParams = {};
      if (federationId) federationParams.federationId = federationId;
      if (subfederationId) federationParams.subfederationId = subfederationId;
      if (seasonId) federationParams.seasonId = seasonId;
      if (categoryId) federationParams.categoryId = categoryId;

      const json = await getWeekResults(federationParams);
      const { tournaments = [] } = json ?? {};
      const payload = tournaments.map(({ id, name }) => ({
        name,
        id,
      }));

      if (payload.length === 0) {
        set.status = 204;
        return;
      }

      return payload;
    },
    {
      query: t.Object({
        federationId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          default: NATIONAL_FEDERATION_ID,
          title: "Federation ID",
          description:
            "The ID of the federation. Defaults to the national federation ID (9999). You can get this ID from the /federations endpoint",
        }),
        subfederationId: t.Optional(
          t.Numeric({
            minimum: 1,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Subfederation ID",
            description:
              "The ID of the subfederation. You can get this ID from the /federation/:id endpoint",
          }),
        ),
        seasonId: t.Numeric({
          minimum: MINIMUM_SESION_ID,
          maximum: getCurrentSeasonId(),
          title: "Season ID",
          description:
            "The ID of the season. Defaults to the current season. You can get this ID from the /seasons endpoint",
          default: getCurrentSeasonId(),
        }),
        categoryId: t.Optional(
          t.Numeric({
            minimum: 0,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Category ID",
            description:
              "The ID of the category. You can get this ID from the /categories endpoint",
          }),
        ),
        championshipId: t.Numeric({
          minimum: 0,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Championship ID",
          description:
            "The ID of the championship. You can get this ID from the /championships endpoint",
        }),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
