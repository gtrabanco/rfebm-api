/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetTeam } from "@gtrabanco/bun-rfebm-scraper-library/get-team";
import { mapGetTeamSelectsInput } from "./map-get-team-selects-input";

export function mapTeamData(input: Exclude<GetTeam, undefined>) {
  const { federation, ...selectsData } = mapGetTeamSelectsInput(input);
  const {
    team: { matches = [], club = undefined },
    team: teamInput,
  } = input;

  const {
    matches: _1,
    category: _2,
    season: _3,
    championship: _4,
    tournament: _5,
    people = [],
    ...team
  } = teamInput;

  const mappedData = {
    federation: {
      ...federation,
      shieldImageUrl: federation.shieldImageUrl.toString(),
    },
    ...selectsData,
    ...team,
    shieldImageUrl: team.shieldImageUrl.toString(),
    club: {
      ...club,
      shieldImageUrl: team.shieldImageUrl.toString(),
    },
    people: people.map((person) => ({
      ...person,
      profileImageUrl: person.profileImageUrl.toString(),
    })),
    matches: matches.map((match) => ({
      ...match,
      local: {
        ...match.local,
        shieldImageUrl: match.local.shieldImageUrl.toString(),
      },
      visitor: {
        ...match.visitor,
        shieldImageUrl: match.visitor.shieldImageUrl.toString(),
      },
    })),
  };

  return mappedData;
}
