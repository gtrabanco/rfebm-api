import {
  WeekResultsPageParams,
  getWeekResults,
} from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { MINIMUM_SESION_ID, NATIONAL_FEDERATION_ID } from "../../../constants";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { federationSchema } from "../schemas/federation-schema";
import { getCurrentSeasonId } from "../../../library/get-current-season-id";

export default (app: Elysia) =>
  app.get(
    "/federation/:federationId",
    async ({ params, query, set }) => {
      const federationId = params.federationId;
      const subfederationId = query.subfederationId;
      const seasonId = query.seasonId;
      const categoryId = query.categoryId;
      const championshipId = query.championshipId;

      const federationParams: WeekResultsPageParams = {};
      if (federationId) federationParams.federationId = federationId;
      if (subfederationId) federationParams.subfederationId = subfederationId;
      if (seasonId) federationParams.seasonId = seasonId;
      if (categoryId) federationParams.categoryId = categoryId;
      if (championshipId) federationParams.championshipId = championshipId;

      const data = await getWeekResults(federationParams);

      const federation = data?.federation;
      const subFederations =
        data?.subfederations?.map(({ id, name }) => ({
          id,
          name,
          subfederationOf: federation?.id,
        })) ?? [];

      if (
        !data ||
        !federation?.id ||
        !federation?.name ||
        !federation?.shieldImageUrl
      ) {
        set.status = 204;
        return;
      }

      const payload: any = {
        id: federation.id,
        name: federation.name,
        shieldImageUrl: federation.shieldImageUrl.toString(),
      };

      if (federation.web) payload.web = federation.web.toString();
      if (subFederations.length > 0) payload.subFederations = subFederations;

      payload.categories = data.categories.map(({ id, name }) => ({
        id,
        name,
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      payload.seasons = data.seasons.map(({ selected, ...season }) => season);
      payload.championships = data.championships.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ selected, ...championship }) => championship,
      );
      payload.tournaments = data.tournaments.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ selected, ...tournament }) => tournament,
      );

      return payload;
    },
    {
      params: t.Object({
        federationId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          default: NATIONAL_FEDERATION_ID,
          title: "Federation ID",
          description:
            "The ID of the federation. Defaults to the national federation ID (9999). You can get this ID from the /federations endpoint",
        }),
      }),
      query: t.Object({
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
        categoryId: t.Optional(
          t.Numeric({
            minimum: 0,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Category ID",
            description:
              "The ID of the category. You can get this ID from the /categories endpoint",
          }),
        ),
        championshipId: t.Optional(
          t.Numeric({
            minimum: 0,
            maximum: Number.MAX_SAFE_INTEGER,
            title: "Championship ID",
            description:
              "The ID of the championship. You can get this ID from the /championships endpoint",
          }),
        ),
      }),
      response: responseSchemaWithPayloadSchema(federationSchema),
      schema: {
        detatail: {
          operationId: "getFederation",
        },
      },
    },
  );
