import express from "express";
import { userLogin } from "../controllers/usersControllers.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post("/login", userLogin);

export default userRouter;
