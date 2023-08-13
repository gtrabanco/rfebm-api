import { Elysia } from "elysia";
import { apiv1 } from "./v1/routes";

export default (app: Elysia) =>
  app
    .group("/v1", (app) => app.use(apiv1))
    .group("/latest", (app) => app.use(apiv1));
