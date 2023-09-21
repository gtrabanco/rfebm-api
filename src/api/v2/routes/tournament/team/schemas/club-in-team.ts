import { t } from "elysia";

export const ClubInTeam = t.Object({
  id: t.Number(),
  name: t.String(),
  shieldImageUrl: t.String(),
});
