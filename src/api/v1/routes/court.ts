import {
  CourtInfoAction,
  getCourt,
} from "@gtrabanco/bun-rfebm-scraper-library/get-court";
import { t, type Elysia } from "elysia";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";

const payloadSchema = t.Object({
  id: t.Number(),
  city: t.String(),
  province: t.String(),
  postalCode: t.Number(),
  address: t.String(),
  phone: t.Number(),
  latitude: t.Number(),
  longitude: t.Number(),
  timezone: t.String(),
});

export default (app: Elysia) =>
  app.get(
    "/court/:courtId",
    async ({ set, params: { courtId } }) => {
      const payload = await getCourt({
        action: CourtInfoAction.COURT_DETAILS,
        params: {
          courtId,
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
        courtId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
          title: "Court ID",
          description:
            "The id of the court to get more information about the court.",
        }),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
