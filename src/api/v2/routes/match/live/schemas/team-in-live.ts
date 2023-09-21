import { t } from "elysia";
import { PersonInTeamLive } from "./person-in-team-live";

export const TeamInLive = t.Object({
  name: t.String(),
  shieldImageUrl: t.String(),
  score: t.Numeric(),
  people: t.Array(PersonInTeamLive),
});
