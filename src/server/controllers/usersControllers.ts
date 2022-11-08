import "../../loadEnvironments.js";
import type { NextFunction, Request, Response } from "express";
import jsw from "jsonwebtoken";
import { User } from "../../database/models/User.js";
import CustomError from "../customError/customError.js";
import type { Credentials } from "../types.js";
import bcrypt from "bcryptjs";
import type { UserTokenPayload } from "../types.js";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;

  const user = await User.findOne({ username });

  if (!user) {
    const customError = new CustomError(
      "Your user is not registered!",
      401,
      "Error logging! Please register first!"
    );
    next(customError);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const customError = new CustomError(
      "Your user is not registered!",
      401,
      "Error logging! Please register first!"
    );
    next(customError);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jsw.sign(tokenPayload, process.env.SECRET_WORD, {
    expiresIn: "3d",
  });

  res.status(200).json({ accessToken: token });
};
