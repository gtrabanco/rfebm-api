import { t } from "elysia";

export const seasonSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  startDate: t.Date(),
  endDate: t.Date(),
  label: t.String(),
});
