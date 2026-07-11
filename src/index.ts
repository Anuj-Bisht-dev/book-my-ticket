import "dotenv/config";
import { handleApplication } from "./modules/app.js";
import { createServer } from "node:http";

const PORT = process.env.PORT || 8080;

const server = createServer(handleApplication());

server.listen(PORT, async()=>{

    

    console.log(`Server is running in ${process.env.PORT} in ${process.env.ENVIORNMENT} mode`);
});
