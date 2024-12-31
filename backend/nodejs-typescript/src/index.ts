import "dotenv/config";

import http from "http";
import config from "./config";
import app from "./app";
import logger from "./libs/logger";

const host = config.host;
const port = config.port;

const server = http.createServer(app);

async function main() {
  server.listen(port, () => {
    logger.info(`Server running at http://${host}:${port}`);
  });
}

main();
