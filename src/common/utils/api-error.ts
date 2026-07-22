export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static unauthorize(message = "unauthorize") {
    return new ApiError(message, 401);
  }

  static badRequest(message = "bad request") {
    return new ApiError(message, 400);
  }

  static notFound(message = "not found") {
    return new ApiError(message, 404);
  }

  static serverNotResponding(message = "server not responding") {
    return new ApiError(message, 500);
  }

  static notAvailable(message = "not available") {
    return new ApiError(message, 503);
  }
}
