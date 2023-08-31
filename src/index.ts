import cors from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { Serve } from "bun";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import api from "./api/index.ts";
import { API_DOCUMENTATION } from "./config/api-documentation.ts";
import { config } from "./config/index.ts";
import { NOT_FOUND_ERROR_CODE, VALIDATION_ERROR_CODE } from "./constants.ts";

export const App = new Elysia()
  .on("request", ({ request }) => {
    console.log(`${request.method} ${request.url} - ${request.url}`);
  })
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

    if (code === NOT_FOUND_ERROR_CODE) {
      set.redirect = "/openapi";
    }

    console.log("Error '%s' - %s", code, error);
  })
  .on("response", ({ set }) => {
    // Set X-Robots-Tag header to prevent indexing
    // Reference: https://developers.google.com/search/reference/robots_meta_tag
    set.headers[
      "X-Robots-Tag"
    ] = `none, noarchive, nosnippet, nositelinkssearchbox, noodp, notranslate, noimageindex, unavailable_after: ${new Date().toISOString()}`;
  })
  .use(
    staticPlugin({
      prefix: "",
      assets: "public",
    }),
  )
  .use(rateLimit(config.rateLimit.general))
  .use(rateLimit(config.rateLimit.live))
  .use(cors())
  .use(
    swagger({
      path: "/openapi",
      documentation: API_DOCUMENTATION,
    }),
  )
  .get("/robots.txt", () => `User-agent: *\nDisallow: /`) // Disallow all robots to index anything here
  // .get("/terms*", () => Bun.file("../public/terms.html"))
  .group("/api", (app) => app.use(api))
  .route("ALL", "", ({ set }) => {
    set.redirect = `/openapi`;
  })
  .listen(config.serve as Partial<Serve>);

export const endpointAddress = `${App.server!.hostname}:${App.server!.port}`;
export type App = typeof App;

console.log(`🧅 Usin Bun version ${Bun.version}`);
console.info(`🦊 Elysia() is running at http://${endpointAddress}`);
