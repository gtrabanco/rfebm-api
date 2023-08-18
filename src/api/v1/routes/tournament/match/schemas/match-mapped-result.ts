import { t } from "elysia";
import { Person } from "../../../../schemas/person";
import { Court } from "./court";
import { MatchAction } from "./match-action";
import { TeamInLive } from "./team-in-live";

export const MatchMappedResult = t.Object(
  {
    local: TeamInLive,
    visitor: TeamInLive,
    court: t.Optional(Court),
    date: t.Optional(t.String()),
    time: t.Optional(t.String()),
    people: t.Array(t.Pick(Person, ["fullName", "role"])), // Referees, annonatators...
    actions: t.Array(MatchAction),
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
