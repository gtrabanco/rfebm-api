import { getWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import type { Elysia } from "elysia";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { selectOptionsSchema } from "../schemas/select-options-schema";

export default (app: Elysia) =>
  app.get(
    "/federations",
    async ({ set, request }) => {
      console.info(request);
      const json = await getWeekResults();
      const { federations = [] } = json ?? {};
      const payload = federations.map(({ id, name }) => ({
        name,
        id,
      }));

      // No content
      if (federations.length === 0) {
        set.status = 204;
        return;
      }

      // Content
      return payload;
    },
    {
      response: responseSchemaWithPayloadSchema(selectOptionsSchema),
    },
  );
