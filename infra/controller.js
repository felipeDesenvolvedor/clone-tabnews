import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
} from "infra/errors.js";

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }

  const publicObjectError = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });

  console.error(publicObjectError);
  response.status(publicObjectError.statusCode).json(publicObjectError);
}

function onNoMatchHandler(request, response) {
  const publicObjectError = new MethodNotAllowedError();
  response.status(publicObjectError.statusCode).json(publicObjectError);
}

const controller = {
  errorHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
