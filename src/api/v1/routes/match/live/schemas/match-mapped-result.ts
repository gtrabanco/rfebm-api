import { t } from "elysia";
import { Person } from "../../../../schemas/person";
import { Court } from "./court";
import { MatchAction } from "./match-action";
import { TeamInLive } from "./team-in-live";

export const MatchMappedResult = t.Object({
  local: TeamInLive,
  visitor: TeamInLive,
  court: t.Optional(Court),
  date: t.Optional(t.String()),
  time: t.Optional(t.String()),
  people: t.Array(t.Pick(Person, ["fullName", "role"])), // Referees, annonatators...
  actions: t.Array(MatchAction),
});
