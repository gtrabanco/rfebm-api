import { t } from "elysia";
import { PersonInTeamLive } from "./person-in-team-tournament-match-live";

export const TeamInTournamentMatchLive = t.Object({
  id: t.Numeric(),
  name: t.String(),
  shieldImageUrl: t.String(),
  score: t.Numeric(),
  people: t.Array(PersonInTeamLive),
});
