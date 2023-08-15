import { GetLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { GetPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";

export function mapMatchLive({
  previous,
  matchLiveDetails,
}: {
  previous: GetPrevious;
  matchLiveDetails: GetLiveData;
}) {
  const data: any = {};
  data.local = {
    ...matchLiveDetails.local,
    shieldImageUrl: matchLiveDetails.local.shieldImageUrl.toString(),
    people: matchLiveDetails.local.people?.map((p) => ({
      ...p,
      profileImageUrl: p.profileImageUrl?.toString(),
    })),
  };
  data.visitor = {
    ...matchLiveDetails.visitor,
    shieldImageUrl: matchLiveDetails.visitor.shieldImageUrl.toString(),
    people: matchLiveDetails.visitor.people?.map((p) => ({
      ...p,
      profileImageUrl: p.profileImageUrl?.toString(),
    })),
  };
  if (previous.date) data.date = previous.date;
  if (previous.time) data.time = previous.time;
  if (previous.court) data.court = previous.court;
  data.people = previous.people?.map((p) => ({
    ...p,
    profileImageUrl: p.profileImageUrl?.toString(),
  }));
  data.actions = matchLiveDetails.actions?.map((a) => ({
    ...a,
    person: {
      ...a.person,
      profileImageUrl: a.person?.profileImageUrl?.toString(),
    },
  }));

  return data;
}
