import { t } from "elysia";
import { federationSchema } from "../../../../schemas/federation-schema";
import { Person } from "../../../../schemas/person";
import { seasonSchema } from "../../../../schemas/season-schema";
import { optionSchema } from "../../../../schemas/select-options-schema";
import { TeamInTournamentMatchLive } from "./team-in-tournament-match-live";
import { TournamentMatchLiveAction } from "./tournament-match-live-action";
import { TournamentMatchLiveCourt } from "./tournament-match-live-court";

export const TournamentMatchLiveMappedResult = t.Object(
  {
    week: t.Numeric({
      minimum: 1,
      maximum: 99,
      title: "Week of the match",
      description: 'Match Week ("Jornada" in spanish)',
    }),
    id: t.Numeric({
      minimum: 1,
      maximum: Number.MAX_SAFE_INTEGER,
      title: "Match Id",
      description:
        "You can get the match id from matches of /tournament/:matchId endpoint",
    }),
    federation: federationSchema,
    season: seasonSchema,
    category: optionSchema,
    championship: optionSchema,
    tournament: optionSchema,
    status: t.String({
      title: "Match status",
      description:
        "The status of the match (in spanish, but this will eventually change in the future)",
      default: "Desconocido",
    }),
    local: TeamInTournamentMatchLive,
    visitor: TeamInTournamentMatchLive,
    court: t.Optional(TournamentMatchLiveCourt),
    date: t.Optional(t.String()),
    time: t.Optional(t.String()),
    people: t.Array(t.Pick(Person, ["fullName", "role"])), // Referees, annonatators...
    actions: t.Array(TournamentMatchLiveAction),
  },
  {
    title: "Match live actions if available",
    description: `The current details of a match if available. No all matches has live details or score. If no actions are received you will have the general score of the match if available.
      
      If the match is not live, you will receive the whatever available data from the match.
      
      **NOTE**: The algorithym try to order the actions.
      **IMPORTANT**: Use route \`/tournament/:tournamentId/:week/:matchId/live\` to get more data and team names without any codification problems. Live page sometimes show incorrect team names and tournamentId and week is necessary to get good ones.
      `,
  },
);
