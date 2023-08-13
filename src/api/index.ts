import { Elysia } from "elysia";
import { apiv1 } from "./v1/routes";

export default (app: Elysia) =>
  app
    .state("latest", "v1")
    .group("/v1", (app) => app.use(apiv1))
    .group("/latest", (app) =>
      app
        .route("ALL", "", ({ set, store: { latest } }) => {
          set.redirect = `/api/${latest}`;
        })
        .route("ALL", "*", ({ params, set, store: { latest } }) => {
          const apiRoute = (params as Record<string, string>)["*"];
          set.redirect = `/api/${latest}/${apiRoute}`;
        }),
    );
