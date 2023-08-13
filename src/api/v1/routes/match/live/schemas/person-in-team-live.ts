import { t } from "elysia";
import { Person } from "../../../schemas/person";

export const PersonInTeamLive = t.Intersect([
  Person,
  t.Object({ number: t.Optional(t.Numeric()) }),
]);
