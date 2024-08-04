import { NextFunction, Request, Response } from "express";
import { internalServerError } from "../errors/errors";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction // NOTE: This needs to be here otherwise Express won't know that it is the error middleware
): Response | undefined => {
  if (error.isAppError) {
    const { statusCode, ...rest } = error;

    return res.status(statusCode).send(rest);
  }

  const { statusCode, ...rest } = internalServerError(error);

  console.error(error);

  res.status(statusCode).send(rest);
};

export default errorHandler;
