import {
  getWeekResults,
  WeekResultsPageParams,
} from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { NATIONAL_FEDERATION_ID } from "../../../constants";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { responseWithErrors } from "../libraries/response-with-errors";
import { seasonSchema } from "../schemas/season-schema";

export default (app: Elysia) =>
  app.get(
    "/seasons",
    async ({ set, query }) => {
      const federationId = query.federationId;
      const subfederationId = query.subfederationId;
      if (
        (federationId && isNaN(federationId)) ||
        (subfederationId && isNaN(subfederationId))
      ) {
        return responseWithErrors(
          ["federationId and/or subfederationId must be valid numbers"],
          422,
        );
      }

      const federationParams: WeekResultsPageParams = {};
      if (federationId) federationParams.federationId = federationId;
      if (subfederationId) federationParams.subfederationId = subfederationId;

      const json = await getWeekResults(federationParams);
      const { seasons = [] } = json ?? {};
      const payload = seasons.map(
        ({ id, name, startDate, endDate, label }) => ({
          name,
          id,
          startDate,
          endDate,
          label,
        }),
      );

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
      }),
      response: responseSchemaWithPayloadSchema(seasonSchema),
    },
  );
