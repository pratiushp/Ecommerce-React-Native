export function errorConverter(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof HttpException) {
    statusCode = err.status;
    message = err.message;
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const errorResponse = {
    message,
    statusCode,
  };

  res.status(statusCode).json(errorResponse);
}

export function notFound(req, res, next) {
  const err = new HttpException(404, "Not Found");
  next(err);
}

export class HttpException extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
