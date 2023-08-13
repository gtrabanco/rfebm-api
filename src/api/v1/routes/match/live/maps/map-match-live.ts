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
  data.local = matchLiveDetails.local;
  data.visitor = matchLiveDetails.visitor;
  if (previous.date) data.date = previous.date;
  if (previous.time) data.time = previous.time;
  if (previous.court) data.court = previous.court;
  data.people = previous.people;
  data.actions = matchLiveDetails.actions;
  return data;
}
