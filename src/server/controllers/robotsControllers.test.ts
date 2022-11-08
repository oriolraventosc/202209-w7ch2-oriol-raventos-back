import {
  deleteRobotById,
  getAllRobots,
  getRobotById,
} from "./robotsControllers";
import type { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robots";
import mockRobotsData from "../../mocks/mockRobotsData";
import CustomError from "../customError/customError";
import mockToken from "../../mocks/mockToken";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getAllRobots controller", () => {
  describe("When its receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const status = 200;

      Robot.find = jest.fn().mockReturnValue(mockRobotsData);
      await getAllRobots(null, res as Response, null);

      expect(res.status).toHaveBeenLastCalledWith(status);
    });

    test("Then it should call its method json with a list of robots", async () => {
      const robotsBody = {
        robots: mockRobotsData,
      };

      Robot.find = jest.fn().mockReturnValue(mockRobotsData);
      await getAllRobots(null, res as Response, null);

      expect(res.json).toHaveBeenCalledWith(robotsBody);
    });

    describe("When it receives a response with an error", () => {
      test("Then it should call the next function with a customError", async () => {
        const customError = new CustomError(
          "",
          500,
          "Your robot has exploded!"
        );

        Robot.find = jest.fn().mockRejectedValue(customError);
        await getAllRobots(null, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(customError);
      });
    });
  });
});

describe("Given a getRobotById controller", () => {
  describe("When its receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const status = 200;
      const req = {
        params: "" as unknown,
      };

      Robot.findById = jest.fn().mockReturnValue(mockRobotsData);
      await getRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenLastCalledWith(status);
    });
  });
});

describe("Given a deleteRobotById controller", () => {
  describe("When its receives a response", () => {
    test("Then it should call its method status with 204", async () => {
      const status = 204;
      const idTest = mockRobotsData[1]._id;
      const tokenTest = mockToken;
      const req: Partial<Request> = {
        params: { idRobot: idTest },
        query: { token: tokenTest },
      };

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(mockRobotsData);
      await deleteRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When its receives a response with request token '1234abc'", () => {
    test("Then it should call its method json with a 'Invalid Robot Token, message", async () => {
      const errorMessage = {
        message: "Invalid Robot Token",
      };
      const idTest = mockRobotsData[1]._id;
      const tokenTest = "1234abc";
      const req: Partial<Request> = {
        params: { idRobot: idTest },
        query: { token: tokenTest },
      };

      await deleteRobotById(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then it should call the next function with a customError", async () => {
      const customError = new CustomError("", 500, "Your robot has exploded!");
      const tokenTest = mockToken;
      const req: Partial<Request> = {
        params: {},
        query: { token: tokenTest },
      };

      Robot.findByIdAndDelete = jest.fn().mockRejectedValue(customError);
      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
