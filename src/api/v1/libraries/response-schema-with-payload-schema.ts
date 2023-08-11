import type { TSchema } from "@sinclair/typebox";
import { t } from "elysia";

export const responseSchemaWithPayloadSchema = (schema: TSchema) => ({
  200: schema, // OK
  204: t.Optional(t.Any()),
  400: t.Union([t.String(), t.Object({ errors: t.Array(t.String()) })]), // Bad Request
  422: t.Union([t.String(), t.Object({ errors: t.Array(t.String()) })]),
});
