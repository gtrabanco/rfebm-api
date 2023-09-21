import { t } from "elysia";

export const CourtInTeam = t.Object({
  name: t.String(),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  address: t.Optional(t.String()),
});
