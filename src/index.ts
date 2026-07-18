import "dotenv/config";
import { handleApplication } from "./modules/app.js";
import { createServer } from "node:http";
import { ApiError } from "./common/utils/api-error.js";
import { env } from "./common/config/config.env.js";

const PORT = env.PORT || 8080;

const server = createServer(handleApplication());

const main = () => {
  try {
    server.listen(PORT, async () => {
      console.log(
        `Server is running in ${env.PORT} in ${env.ENVIORNMENT} mode`
      );
    });
  } catch (error) {
    ApiError.serverNotResponding(`server not responding: ${error}`);
  }
};

main();