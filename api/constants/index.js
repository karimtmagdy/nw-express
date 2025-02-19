export const reminder = process.env.JWT_REMINDER_EXPIRE_AT;
export const cookie = process.env.JWT_SECRET_COOKIE;

export const success = 200;
export const created = 201;
export const accepted = 202;

export const noContent = 204;
export const badRequest = 400;
export const unauthorized = 401;
export const forbidden = 403;
export const notFound = 404;
export const conflict = 409;
export const gone = 410;
export const unProcessable = 422;
export const serverError = 500;
// export const internalServerError=500;
export const serviceUnavailable = 503;
export const gatewayTimeout = 504;
export const httpVersionNotSupported = 505;
export const networkAuthenticationRequired = 511;

export const no_token_401 =
  "access denied: Invalid or expired token provided. please authenticate to access this resource.";
export const not_authenticate_401 =
  "unauthorized: you'r not authenticated. Please log in to access this resource.";
export const auth_not_role_403 =
  "forbidden: you'r authenticated, but your token does not grant the required permissions to access this resource.";

export const not_found_404 = "resource not found";