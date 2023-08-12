import { getWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { federationSchema } from "../schemas/federation-schema";

export default (app: Elysia) =>
  app.get(
    "/federation/:id",
    async ({ params, set }) => {
      const json = await getWeekResults({
        federationId: params.id,
      });

      const federation = json?.federation;
      const subFederations =
        json?.subfederations?.map(({ id, name }) => ({
          id,
          name,
        })) ?? [];

      if (
        !json ||
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

      return payload;
    },
    {
      params: t.Object({
        id: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
        }),
      }),
      response: responseSchemaWithPayloadSchema(federationSchema),
    },
  );
