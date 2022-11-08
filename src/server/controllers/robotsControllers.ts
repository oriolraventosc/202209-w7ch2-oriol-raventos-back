import "../../loadEnvironments.js";
import CustomError from "../customError/customError.js";
import type { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robots.js";

export const getAllRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const robots = await Robot.find();
    res.status(200).json({ robots });
  } catch (error: unknown) {
    const throwError = new CustomError(
      (error as Error).message,
      500,
      "Your robot has exploded!"
    );
    next(throwError);
  }
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRobot } = req.params;
    const robot = await Robot.findById(idRobot);
    res.status(200).json({ robot });
  } catch (error: unknown) {
    const throwError = new CustomError(
      (error as Error).message,
      500,
      "Your robot has exploded!"
    );
    next(throwError);
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRobot } = req.params;
    const { token } = req.query;

    if (token !== process.env.TOKEN) {
      res.status(498).json({ message: "Invalid Robot Token" });
      return;
    }

    const robot = await Robot.findByIdAndDelete(idRobot);
    res.status(204).json({ robot });
  } catch (error: unknown) {
    const throwError = new CustomError(
      (error as Error).message,
      500,
      "Your robot has exploded!"
    );
    next(throwError);
  }
};
