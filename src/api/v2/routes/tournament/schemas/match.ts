import { t } from "elysia";
import { seasonSchema } from "../../../schemas/season-schema";
import { optionSchema } from "../../../schemas/select-options-schema";
import { CourtInMatch } from "./court-in-match";
import { TeamInMatch } from "./team-in-match";

const matchFederationSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  shieldImageUrl: t.String(),
  web: t.Optional(t.String()),
});

export const Match = t.Object({
  id: t.Number(),
  federation: matchFederationSchema,
  season: seasonSchema,
  category: optionSchema,
  championship: optionSchema,
  tournament: optionSchema,
  status: t.String(),
  local: TeamInMatch,
  visitor: TeamInMatch,
  court: t.Optional(CourtInMatch),
  date: t.Optional(t.String()),
  time: t.Optional(t.String()),
  timezone: t.Optional(t.String()),
  streamingUrl: t.Optional(t.String()),
});
