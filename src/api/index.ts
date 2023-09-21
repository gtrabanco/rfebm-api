import { type Context, Elysia } from "elysia";
import { apiv2 } from "./v2/routes";
// import { apiv1 } from "./v1/routes";

export default (app: Elysia) =>
  app
    // .use(apiv1)
    .state("latest", "v2")
    .group("/v2", (app) => app.use(apiv2))
    .group("/latest", (app) =>
      app
        .all(
          "*",
          ({
            set,
            store: { latest },
          }: Context & { store: { latest: string } }) => {
            set.redirect = `/api/${latest}`;
          },
        )
        .all(
          "*",
          ({
            params,
            set,
            store: { latest },
          }: Context & { store: { latest: string } }) => {
            const apiRoute = (params as Record<string, string>)["*"];
            set.redirect = `/api/${latest}/${apiRoute}`;
          },
        ),
    );
