import AppErrors from "@/AppErrors";
import HttpStatusCodes from "@/HttpStatusCodes";

type AppError = {
  error: AppErrors;
  error_description: Error | string;
  isAppError: true;
  statusCode: HttpStatusCodes;
};

const internalServerError = (error: Error): AppError => {
  const error_description = {
    ...error,
    message: error.message || "An unexpected internal server error occurred.",
  };

  return {
    error: AppErrors.INTERNAL_SERVER_ERROR,
    error_description,
    isAppError: true,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  };
};

const validationError = (message: string): AppError => {
  return {
    error: AppErrors.VALIDATION_ERROR,
    error_description: message,
    isAppError: true,
    statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
  };
};

const notFound = (message: string): AppError => {
  return {
    error: AppErrors.NOT_FOUND,
    error_description: message,
    isAppError: true,
    statusCode: HttpStatusCodes.NOT_FOUND,
  };
};

export { internalServerError, validationError, notFound };
