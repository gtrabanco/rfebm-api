import { t } from "elysia";
import { Person } from "../../../schemas/person";

export const MatchAction = t.Object({
  time: t.String(),
  event: t.String(),
  period: t.Numeric(),
  team: t.String(),
  person: Person,
  score: t.Optional(
    t.Object({
      local: t.Numeric(),
      visitor: t.Numeric(),
    }),
  ),
});
