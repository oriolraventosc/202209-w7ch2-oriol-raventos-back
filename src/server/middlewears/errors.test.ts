import type { Response } from "express";
import CustomError from "../customError/customError";
import { endpointUnknown, generalError } from "./errors";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a endpointUnknown middlewear", () => {
  describe("When its receives a response", () => {
    test("Then it should call its method status with 404", () => {
      const statusCode = 404;

      endpointUnknown(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its method json with a 'Error not found the endpoint, message", () => {
      const errorResponse = {
        message: "Error not found the endpoint",
      };

      endpointUnknown(null, res as Response);

      expect(res.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});

describe("Given a generalError middlewear", () => {
  describe("When its receives a response with an empty customError message", () => {
    const error = new CustomError("");
    test("Then it should call its method status with 500", () => {
      const status = 500;

      generalError(error, null, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call its method json with a error 'Opps...General Error' error", () => {
      const errormessage = {
        error: "Opps...General Error",
      };

      generalError(error, null, res as Response, () => {});

      expect(res.json).toHaveBeenCalledWith(errormessage);
    });
  });

  describe("When its receives a response with a status 406 and a customError with a customMessage", () => {
    const status = 406;
    const customMessageExpected = "General problem";
    const error = new CustomError("", status, customMessageExpected);

    test("Then it should call its method status with 406", () => {
      generalError(error, null, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call its method json with the customMessage received", () => {
      const responseBodyMessage = {
        error: error.customMessage,
      };

      generalError(error, null, res as Response, () => {});

      expect(res.json).toHaveBeenCalledWith(responseBodyMessage);
    });
  });
});
