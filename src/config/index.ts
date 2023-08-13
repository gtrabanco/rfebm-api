import { Serve } from "bun";
import { ElysiaConfig } from "elysia";
import { getServerAddressToConfigure } from "./get-server-address-to-configure";
import { getServerPortToConfigure } from "./get-server-port-to-configure";

export const config: ElysiaConfig = {
  serve: {
    hostname: getServerAddressToConfigure(),
    port: getServerPortToConfigure(),
    development: !process.env.NODE_ENV?.toLowerCase().startsWith("prod"),
  } as Partial<Serve>,
};
