import { getWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { NATIONAL_FEDERATION_ID } from "../../../constants";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { federationSchema } from "../schemas/federation-schema";

export default (app: Elysia) =>
  app.get(
    "/federation/:federationId",
    async ({ params: { federationId }, set }) => {
      const data = await getWeekResults({
        federationId: federationId,
      });

      const federation = data?.federation;
      const subFederations =
        data?.subfederations?.map(({ id, name }) => ({
          id,
          name,
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

      return payload;
    },
    {
      params: t.Object({
        federationId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          default: NATIONAL_FEDERATION_ID,
          title: "Federation ID",
          description: "The federation ID to get details from.",
        }),
      }),
      response: responseSchemaWithPayloadSchema(federationSchema),
    },
  );
