import { config } from "../library/config";
import { API_DESCRIPTION } from "./api-description";

export const API_DOCUMENTATION = {
  info: {
    title: "RFEBM API",
    description: API_DESCRIPTION,
    version: "1.0.0",
    termsOfService: "http://rfbem.7m.es/terms",
    contact: {
      name: "Gabriel Trabanco",
      email: "gtrabanco@fwok.org",
      url: "https://gabi.io",
    },
    license: {
      name: "Private Unlicensed Code & API",
      url: "/license",
    },
  },
  servers: [
    {
      url: `http://${config.serve!.hostname}:${config.serve!.port}`,
      description: "Local server",
    },
    {
      url: `http://rfbem.7m.es`,
      description: "Production server",
    },
  ],
};
