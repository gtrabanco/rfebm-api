/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetTeam } from "@gtrabanco/bun-rfebm-scraper-library/get-team";

export function mapGetTeamSelectsInput(input: Exclude<GetTeam, undefined>) {
  const { selected: _1, ...federation } = input.federation;
  const { selected: _2 = "", ...season } =
    input.seasons?.find((season) => season.selected) ?? {};
  const { selected: _3 = "", ...category } =
    input.categories?.find((category) => category.selected) ?? {};
  const { selected: _4 = "", ...championship } =
    input.championships?.find((championship) => championship.selected) ?? {};
  const { selected: _5 = "", ...tournament } =
    input.tournaments?.find((tournament) => tournament.selected) ?? {};

  return {
    federation: {
      ...federation,
      shieldImageUrl: federation.shieldImageUrl.toString(),
      web: federation.web?.toString(),
    },
    season,
    category,
    championship,
    tournament,
  };
}
