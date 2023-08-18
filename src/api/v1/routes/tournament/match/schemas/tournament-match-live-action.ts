import { t } from "elysia";
import { PersonInTeamLive } from "./person-in-team-tournament-match-live";

export const TournamentMatchLiveAction = t.Object({
  time: t.String(),
  event: t.String(),
  period: t.Numeric(),
  team: t.String(),
  people: t.Optional(PersonInTeamLive),
  score: t.Optional(
    t.Object({
      local: t.Numeric(),
      visitor: t.Numeric(),
    }),
  ),
});
