import { getPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import { getLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../libraries/response-schema-with-payload-schema";
// matchId: 1298587: Vetusta 2023-24 (with date and place set)
// matchId: 1298818: Vetusta 2023-24 (only place set)
// matchId: 1221062: Vetusta 2022-23
const payloadSchema = t.Any();

export default (app: Elysia) =>
  app.get(
    "/:matchId",
    async ({ params: { matchId }, set }) => {
      const previous = await getPrevious({ matchId });
      if (!previous) {
        set.status = 204;
        return;
      }

      const matchLiveDetails = await getLiveData({ matchId });

      return { previous, matchLiveDetails };
    },
    {
      params: t.Object({
        matchId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
        }),
      }),
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
