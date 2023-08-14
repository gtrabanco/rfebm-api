import { t } from "elysia";

export const TeamMatchInTeam = t.Object({
  id: t.Number(),
  name: t.String(),
  shieldImageUrl: t.String(),
  score: t.Optional(t.Number()),
});
