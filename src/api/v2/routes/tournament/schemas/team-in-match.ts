import { t } from "elysia";

export const TeamInMatch = t.Object({
  id: t.Number(),
  name: t.String(),
  shieldImageUrl: t.String(),
  score: t.Optional(t.Number()),
  tournament: t.Optional(t.Number()),
});
