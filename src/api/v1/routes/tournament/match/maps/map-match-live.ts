import { GetLiveData } from "@gtrabanco/bun-rfebm-scraper-library/get-live-data";
import { GetPrevious } from "@gtrabanco/bun-rfebm-scraper-library/get-previous";
import { URL_NO_IMAGE_PERSON } from "../../../../../../constants";

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
      profileImageUrl: p.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
    })),
  };
  data.visitor = {
    ...matchLiveDetails.visitor,
    shieldImageUrl: matchLiveDetails.visitor.shieldImageUrl.toString(),
    people: matchLiveDetails.visitor.people?.map((p) => ({
      ...p,
      profileImageUrl: p.profileImageUrl?.toString() ?? URL_NO_IMAGE_PERSON,
    })),
  };
  if (previous.date) data.date = previous.date;
  if (previous.time) data.time = previous.time;
  if (previous.court) data.court = previous.court;

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
