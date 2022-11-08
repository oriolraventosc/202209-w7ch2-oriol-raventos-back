import express from "express";
import morgan from "morgan";
import router from "./routers/robotRouters.js";
import { endpointUnknown, generalError } from "./middlewears/errors.js";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

const serverApp = express();

serverApp.disable("x-powered-by");

serverApp.use(morgan("dev"));

serverApp.use(express.json());

serverApp.use("/", cors(), router);
serverApp.use("/users", cors(), userRouter);

serverApp.use(endpointUnknown);
serverApp.use(generalError);

export default serverApp;
