import {
  getWeekResults,
  WeekResultsPageParams,
} from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { MINIMUM_SESION_ID, NATIONAL_FEDERATION_ID } from "../../../constants";
import { getCurrentSeasonId } from "../../../library/get-current-season-id";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { optionSchema } from "../schemas/select-options-schema";

const payloadSchema = t.Array(optionSchema);
payloadSchema.title = "Categories";
payloadSchema.description =
  "Get the categories that have data available for the given federation, subfederation and season. By default, federation is the national federation, season is the current season and subfederation is optional.";

export default (app: Elysia) =>
  app.get(
    "/categories",
    async ({ set, query }) => {
      const federationId = query.federationId;
      const subfederationId = query.subfederationId;
      const seasonId = query.seasonId;

      const federationParams: WeekResultsPageParams = {};
      if (federationId) federationParams.federationId = federationId;
      if (subfederationId) federationParams.subfederationId = subfederationId;
      if (seasonId) federationParams.seasonId = seasonId;

      const json = await getWeekResults(federationParams);
      const { categories = [] } = json ?? {};
      const payload = categories.map(({ id, name }) => ({
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
        seasonId: t.Optional(
          t.Numeric({
            minimum: MINIMUM_SESION_ID,
            maximum: getCurrentSeasonId(),
            title: "Season ID",
            description:
              "The ID of the season. Defaults to the current season. You can get this ID from the /seasons endpoint",
            default: getCurrentSeasonId(),
          }),
        ),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
