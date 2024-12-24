/** @constructor ApiError  */
export default class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }

  // this will be handled by our global error handler
  isOperational = true;
}
