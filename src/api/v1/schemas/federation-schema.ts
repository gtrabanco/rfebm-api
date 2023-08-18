import { t } from "elysia";
import { selectOptionsSchema } from "./select-options-schema";

export const federationSchema = t.Object(
  {
    id: t.Number(),
    name: t.String(),
    shieldImageUrl: t.String(),
    web: t.Optional(t.String()),
    subFederations: t.Optional(selectOptionsSchema),
  },
  {
    title: "Federation",
    description: "Get the available metadata details of a federation.",
  },
);
