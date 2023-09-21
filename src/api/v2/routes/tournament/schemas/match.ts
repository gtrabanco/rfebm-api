import { t } from "elysia";
import { federationSchema } from "../../../schemas/federation-schema";
import { seasonSchema } from "../../../schemas/season-schema";
import { optionSchema } from "../../../schemas/select-options-schema";
import { CourtInMatch } from "./court-in-match";
import { TeamInMatch } from "./team-in-match";

export const Match = t.Object({
  id: t.Number(),
  federation: federationSchema,
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
