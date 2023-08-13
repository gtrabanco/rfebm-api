import { t } from "elysia";

export const Court = t.Object({
  name: t.String(),
  latitude: t.Optional(t.Numeric()),
  longitude: t.Optional(t.Numeric()),
  address: t.Optional(t.String()),
  timezone: t.Optional(t.String()),
});
