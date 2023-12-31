import { Serve } from "bun";
import { ElysiaConfig } from "elysia";
import { getServerAddressToConfigure } from "./get-server-address-to-configure";
import { getServerPortToConfigure } from "./get-server-port-to-configure";

export const config: ElysiaConfig & { rateLimit: any } = {
  serve: {
    hostname: getServerAddressToConfigure(),
    port: getServerPortToConfigure(),
    development: !process.env.NODE_ENV?.toLowerCase().startsWith("prod"),
  } as Partial<Serve>,
  rateLimit: {
    general: {
      duration: 60000,
      max: 10,
      responseCode: 429,
      responseMessage: "Rate limit exceeded, retry in 15 seconds.",
      countFailedRequest: false,
      skip: (request: Request) =>
        request.url.toString().endsWith("/live") ||
        !process.env.NODE_ENV?.toLowerCase().startsWith("prod"), // Avoid on development, which mean avoid cache if non on production
    },
    live: {
      duration: 15000,
      max: 2,
      responseCode: 429,
      responseMessage: "Rate limit exceeded, retry in 15 seconds.",
      countFailedRequest: false,
      skip: (request: Request) =>
        !request.url.toString().endsWith("/live") ||
        !process.env.NODE_ENV?.toLowerCase().startsWith("prod"), // Avoid on development, which mean avoid cache if non on production
    }, // live are different from stream, stream are SSE endpoints
    // stream: {
    //   duration: 5000,
    //   max: 10,
    //   responseCode: 429,
    //   responseMessage: "Rate limit exceeded, retry in 15 seconds.",
    //   countFailedRequest: false,
    //   skip: (request: Request) =>
    //     !request.url.toString().endsWith("/stream") ||
    //     !process.env.NODE_ENV?.toLowerCase().startsWith("prod"), // Avoid on development, which mean avoid cache if non on production
    // }, // SSE endpoints this a TODO
  },
};
