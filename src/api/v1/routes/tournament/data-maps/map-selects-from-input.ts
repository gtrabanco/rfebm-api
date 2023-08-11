/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetAllMatches,
  GetWeekResults,
} from "@gtrabanco/bun-rfebm-scraper-library";
import { FEDERATION_KEY_SHIELD_URL } from "@gtrabanco/bun-rfebm-scraper-library/src/types/federation";

export function mapSelectsFromInput(input: GetWeekResults | GetAllMatches) {
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
      shieldImageUrl: federation[FEDERATION_KEY_SHIELD_URL].toString(),
      web: federation.web?.toString(),
    },
    season,
    category,
    championship,
    tournament,
  };
}
