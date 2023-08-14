import { t } from "elysia";
import { CourtInTeam } from "./court-in-team";
import { TeamMatchInTeam } from "./team-match-in-team";

export const MatchInTeam = t.Object({
  id: t.Number(),
  week: t.Number(),
  status: t.String(),
  court: t.Optional(CourtInTeam),
  date: t.Optional(t.String()), // If it is 00-00-00 it means that the match date has not been set yet
  time: t.Optional(t.String()), // If it is 00:00 it means that the match time has not been set yet
  timezone: t.Optional(t.String()),
  local: TeamMatchInTeam,
  visitor: TeamMatchInTeam,
});
