import "../loadEnvironments.js";
import mongoose from "mongoose";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator(`${process.env.DEBUG}dataBase`);

const connectToDataBase = async (url: string) => {
  try {
    await mongoose.connect(url);
    debug(chalk.yellow("Connect with data base"));
  } catch {
    debug(chalk.red("Error connecting to data base!!"));
  }
};

export default connectToDataBase;
