import { GetLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { GetPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import { GetWeekResults } from "@gtrabanco/bun-rfebm-scraper-library/get-week-results";
import { URL_NO_IMAGE_PERSON } from "../../../../../../constants";
import { mapSelectsFromInput } from "../../data-maps/map-selects-from-input";

export function mapTournamentMatchLive({
  previous,
  matchLiveDetails,
  tournamentData,
  week,
  matchId,
}: {
  previous: GetPrevious;
  matchLiveDetails: GetLiveData;
  tournamentData: GetWeekResults;
  week: number;
  matchId: number;
}) {
  const match = tournamentData.results?.find((m) => m.id === matchId);
  if (!match) return;

  const { federation, season, category, championship, tournament } =
    mapSelectsFromInput(tournamentData);

  const data: any = {};
  data.id = matchId;
  data.week = week;

  data.federation = federation;
  data.season = season;
  data.category = category;
  data.championship = championship;
  data.tournament = tournament;

  data.status = match.status;
  if (match.streamingUrl) data.streamingUrl = match.streamingUrl;

  data.local = {
    ...matchLiveDetails.local,
    id: match.local.id,
    name: match.local.name,
    shieldImageUrl: matchLiveDetails.local.shieldImageUrl.toString(),
    people: matchLiveDetails.local.people?.map((p) => ({
      ...p,
      profileImageUrl: p.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
    })),
  };
  data.visitor = {
    ...matchLiveDetails.visitor,
    id: match.visitor.id,
    name: match.visitor.name,
    shieldImageUrl: matchLiveDetails.visitor.shieldImageUrl.toString(),
    people: matchLiveDetails.visitor.people?.map((p) => ({
      ...p,
      profileImageUrl: p.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
    })),
  };
  if (previous.date) data.date = previous.date;
  if (previous.time) data.time = previous.time;
  if (previous.court) {
    data.court = previous.court;
  }

  data.people = previous.people?.map((p) => {
    if (p.profileImageUrl)
      return {
        ...p,
        profileImageUrl: p.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
      };

    return p;
  });

  data.actions = matchLiveDetails.actions?.map((a) => {
    if (a.person)
      return {
        ...a,
        person: {
          ...a.person,
          profileImageUrl:
            a.person?.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
        },
      };

    return a;
  });

  return data;
}
