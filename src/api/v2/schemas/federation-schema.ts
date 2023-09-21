import { t } from "elysia";
import { optionSchema, selectOptionsSchema } from "./select-options-schema";
import { seasonSchema } from "./season-schema";

export const federationSchema = t.Object(
  {
    id: t.Number(),
    name: t.String(),
    shieldImageUrl: t.String(),
    web: t.Optional(t.String()),
    subFederations: t.Optional(
      t.Union([
        selectOptionsSchema,
        t.Object({ subfederationOf: t.Optional(t.Number()) }),
      ]),
    ),
    categories: t.Array(optionSchema, {
      default: [],
    }),
    seasons: t.Array(seasonSchema, {
      default: [],
    }),
    championships: t.Array(optionSchema, {
      default: [],
    }),
    tournaments: t.Array(optionSchema, {
      default: [],
    }),
  },
  {
    title: "Federation",
    description: "Get the available metadata details of a federation.",
  },
);
