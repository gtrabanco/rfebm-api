import { t } from "elysia";
import { federationSchema } from "../../../../schemas/federation-schema";
import { Person } from "../../../../schemas/person";
import { seasonSchema } from "../../../../schemas/season-schema";
import { optionSchema } from "../../../../schemas/select-options-schema";
import { ClubInTeam } from "./club-in-team";
import { MatchInTeam } from "./match-in-team";

export const TeamInTeam = t.Object(
  {
    id: t.Numeric(),
    name: t.String(),
    shieldImageUrl: t.String(),
    federation: federationSchema,
    season: seasonSchema,
    category: optionSchema,
    championship: optionSchema,
    tournament: optionSchema,
    club: ClubInTeam, // TODO: Club schema
    phone: t.Optional(t.Numeric()),
    responsible: t.Optional(t.String()),
    email: t.Optional(t.String()),
    court: t.String(),
    people: t.Optional(t.Array(Person)), // Team can be empty
    matches: t.Optional(t.Array(MatchInTeam)),
  },
  {
    title: "Team information",
    description: `The information of a team in a tournament. This is the information that you can get from the team page.`,
  },
);
