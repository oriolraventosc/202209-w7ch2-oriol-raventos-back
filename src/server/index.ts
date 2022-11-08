import serverApp from "./app.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator(`${process.env.DEBUG}server`);

const startServer = async (port: number) => {
  await new Promise((resolve) => {
    const server = serverApp.listen(port, () => {
      debug(chalk.blueBright("The server is alive"));
    });
    resolve(server);
  });
};

export default startServer;
