import type { TSchema } from "@sinclair/typebox";
import { t } from "elysia";

export const responseSchemaWithPayloadSchema = (schema: TSchema) => ({
  200: schema, // OK
  204: t.Optional(
    t.Any({
      title: "No content",
      description: "This is returned if request has no content to reply",
    }),
  ), // No Content
  400: t.Union([t.String(), t.Object({ errors: t.Array(t.String()) })], {
    title: "Bad request",
    description: "This is returned if the request is malformed",
  }), // Bad Request
  422: t.Union([t.String(), t.Object({ errors: t.Array(t.String()) })], {
    title: "Unprocessable entity",
    description:
      "This is returned if there were errors validating the request params, body or query",
  }), // Unprocessable entity
});
