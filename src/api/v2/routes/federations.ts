import { getWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import { t, type Elysia } from "elysia";
import { responseSchemaWithPayloadSchema } from "../libraries/response-schema-with-payload-schema";
import { optionSchema } from "../schemas/select-options-schema";

const payloadSchema = t.Array(optionSchema);
payloadSchema.title = "Federations";
payloadSchema.description = `Get a list of all available federations.`;

export default (app: Elysia) =>
  app.get(
    "/federations",
    async ({ set }) => {
      const data = await getWeekResults();
      const payload =
        data?.federations.map(({ id, name }) => ({ id, name })) ?? [];

      // No content
      if (payload.length === 0) {
        set.status = 204;
        return;
      }

      // Content
      return payload;
    },
    {
      response: responseSchemaWithPayloadSchema(payloadSchema),
    },
  );
