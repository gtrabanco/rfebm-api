import { t } from "elysia";

export const optionSchema = t.Object({
  name: t.String(),
  id: t.Number(),
});
export const selectOptionsSchema = t.Array(optionSchema);
