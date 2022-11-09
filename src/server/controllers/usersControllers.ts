import enviroment from "../../loadEnvironments.js";
import type { NextFunction, Request, Response } from "express";
import jsw from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../database/models/User.js";
import CustomError from "../customError/customError.js";
import type { Credentials } from "../types.js";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      const customError = new CustomError(
        "Your username is not found!",
        401,
        "Wrong username!"
      );
      next(customError);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "Your password is not found!",
        401,
        "Wrong password!"
      );
      next(customError);
      return;
    }

    const token = jsw.sign((user._id, username), enviroment.jwtSecretKey, {
      expiresIn: "3d",
    });

    res.status(200).json({ accessToken: token });
  } catch (error: unknown) {
    next(error);
  }
};
