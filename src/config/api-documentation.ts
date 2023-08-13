import { API_DESCRIPTION } from "./api-description";

// const servers = [];
// if (process.env.NODE_ENV === "development") {
//   servers.push({
//     url: `http://${config.serve!.hostname}:${config.serve!.port}`,
//     description: "Local server",
//   });
// }

// servers.push({
//   url: `https://rfbem.7m.es`,
//   description: "Production server",
// });

export const API_DOCUMENTATION = {
  info: {
    title: "RFEBM API",
    description: API_DESCRIPTION,
    version: "1.0.0",
    termsOfService: "https://rfbem.7m.es/terms",
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
};
