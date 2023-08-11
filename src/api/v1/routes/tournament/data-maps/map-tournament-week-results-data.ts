import { GetWeekResults } from "@gtrabanco/bun-rfebm-scraper-library";
import { mapSelectsFromInput } from "./map-selects-from-input";

export function mapTournamentsWeekResultsData(input: GetWeekResults) {
  const { federation, season, category, championship, tournament } =
    mapSelectsFromInput(input);

  const { results, teams: inputTeams } = input;
  const matches = results.map((m) => {
    const match: any = {
      id: m.id,
      federation,
      season,
      category,
      championship,
      tournament,
      status: m.status,
      local: {
        ...m.local,
        shieldImageUrl: m.local.shieldImageUrl.toString(),
      },
      visitor: {
        ...m.visitor,
        shieldImageUrl: m.visitor.shieldImageUrl.toString(),
      },
    };

    if (m.court) match.court = m.court;

    if (m.date) match.date = m.date;

    if (m.time) match.time = m.time;

    if (m.timezone) match.timezone = m.timezone;

    if (m.streamingUrl) match.streamingUrl = m.streamingUrl.toString();

    return match;
  });

  const teams = inputTeams.map?.((t) => ({
    ...t,
    shieldImageUrl: t.shieldImageUrl.toString(),
  }));

  return { matches, teams };
}
