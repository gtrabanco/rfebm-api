import { t } from "elysia";

export const seasonSchema = t.Object(
  {
    id: t.Number(),
    name: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    label: t.String(),
  },
  {
    title: "Season",
    description: "Get the available metadata details of a season.",
  },
);
