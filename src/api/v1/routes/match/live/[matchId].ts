import { getLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { getPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import type { Elysia } from "elysia";
import { t } from "elysia";
import { responseSchemaWithPayloadSchema } from "../../../libraries/response-schema-with-payload-schema";
import { mapMatchLive } from "./maps/map-match-live";

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
      if (!matchLiveDetails) {
        set.status = 204;
        return;
      }

      return mapMatchLive({ previous, matchLiveDetails });
    },
    {
      params: t.Object({
        matchId: t.Numeric({
          minimum: 1,
          maximum: Number.MAX_SAFE_INTEGER,
        }),
      }),
      response: responseSchemaWithPayloadSchema(t.Any()),
    },
  );
