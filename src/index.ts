import enviroment from "./loadEnvironments.js";
import connectToDataBase from "./database/index.js";
import startServer from "./server/index.js";

const { port, mongoDbUrl } = enviroment;

await connectToDataBase(mongoDbUrl);
// eslint-disable-next-line no-implicit-coercion
await startServer(+port);
