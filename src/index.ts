import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Serve } from "bun";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import api from "./api/index.ts";
import { API_DOCUMENTATION } from "./config/api-documentation.ts";
import { config } from "./config/index.ts";
import { VALIDATION_ERROR_CODE } from "./constants.ts";

export const App = new Elysia()
  .on("error", ({ code, set, error }) => {
    if (code === VALIDATION_ERROR_CODE && error.type === "response") {
      set.status = 204; // No Content. If the response is not as we want is because there is no content for the request.
      return;
    }

    if (code === VALIDATION_ERROR_CODE) {
      // console.error(error);
      set.status = 422;
      return "Invalid or missing param or query, value.";
    }

    console.log("Error '%s' - %s", code, error);
  })
  .on("request", ({ request, set }) => {
    console.log(`${request.method} ${request.url} - ${request.url}`);

    // Set X-Robots-Tag header to prevent indexing
    // Reference: https://developers.google.com/search/reference/robots_meta_tag
    set.headers[
      "X-Robots-Tag"
    ] = `none, noarchive, nosnippet, nositelinkssearchbox, noodp, notranslate, noimageindex, unavailable_after: ${new Date().toISOString()}`;
  })
  .use(
    rateLimit({
      duration: 15000,
      max: 10,
      responseCode: 429,
      responseMessage: "Rate limit exceeded, retry in 15 seconds.",
      countFailedRequest: false,
      skip: (request: Request) => request.url.toString().includes("/live"),
    }),
  )
  .use(cors())
  .use(
    swagger({
      path: "/openapi",
      documentation: API_DOCUMENTATION,
    }),
  )
  .get("/robots.txt", () => `User-agent: *\nDisallow: /`) // Disallow all robots to index anything here
  .group("/api", (app) => app.use(api))
  .route("ALL", "", ({ set }) => {
    set.redirect = `/openapi`;
  })
  .route("ALL", "*", ({ set }) => {
    set.redirect = `/openapi`;
  })
  .listen(config.serve as Partial<Serve>);

export const endpointAddress = `${App.server!.hostname}:${App.server!.port}`;
export type App = typeof App;

console.info(`🦊 Elysia() is running at http://${endpointAddress}`);
