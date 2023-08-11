import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Serve } from "bun";
import { Elysia } from "elysia";
import api from "./api/index.ts";
import { API_DOCUMENTATION } from "./config/api-documentation.ts";
import { VALIDATION_ERROR_CODE } from "./constants.ts";
import { config } from "./library/config/index.ts";

export const App = new Elysia()
  .on("error", ({ code, set }) => {
    if (code === VALIDATION_ERROR_CODE) {
      set.status = 422;
      return "Invalid param or query value.";
    }
  })
  .on("response", (args) => {
    console.log(args);
  })
  .use(
    cors({
      origin: `${config.serve!.hostname}:${config.serve!.port}`,
      methods: ["GET", "OPTIONS"],
    }),
  )
  .use(
    swagger({
      path: "/openapi",
      documentation: API_DOCUMENTATION,
    }),
  )
  .group("/api", (app) => app.use(api))
  .listen(config.serve as Partial<Serve>);

export const endpointAddress = `${App.server!.hostname}:${App.server!.port}`;
export type App = typeof App;

console.log(`🦊 Elysia() is running at http://${endpointAddress}`);
