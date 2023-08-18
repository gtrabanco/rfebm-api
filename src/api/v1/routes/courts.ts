import {
  CourtInfoAction,
  getCourt,
} from "@gtrabanco/bun-rfebm-scraper-library/get-court";
import { t, type Elysia } from "elysia";
import { NATIONAL_FEDERATION_ID } from "../../../constants";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";

const payloadSchema = t.Array(
  t.Object({
    id: t.Number(),
    federationId: t.Number(),
    name: t.String(),
    city: t.String(),
    province: t.String(),
    timezone: t.String(),
  }),
  {
    title: "Courts information",
    description: `This gives all the courts that have matches this current season in a federation. This means that when the data of the next season is not loaded you can receive not results or information from previous seasons.`,
  },
);

export default (app: Elysia) =>
  app.get(
    "/courts/:federationId",
    async ({ set, params: { federationId } }) => {
      const payload = await getCourt({
        action: CourtInfoAction.COURTS,
        params: {
          federationId,
        },
      });

      // No content
      if (!payload || payload.length === 0) {
        set.status = 204;
        return;
      }

      // Content
      return payload;
    },
    {
      params: t.Object({
        federationId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Federation ID",
          description:
            "Federation ID to get all the courts that belong to it (Any match of that that federation tournament is played in that court).",
          default: NATIONAL_FEDERATION_ID,
        }),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
