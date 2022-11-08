import "./loadEnvironments.js";
import connectToDataBase from "./database/index.js";
import startServer from "./server/index.js";

const { PORT: port, MONGODB_URL: url } = process.env;

await connectToDataBase(url);
// eslint-disable-next-line no-implicit-coercion
await startServer(+port);
