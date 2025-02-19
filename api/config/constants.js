export const development = process.env.NODE_ENV;
export const port = process.env.PORT || 8000;
export const access = process.env.JWT_ACCESS_TOKEN;
export const expirein = process.env.JWT_EXPIRE_IN;
const cockie = process.env.JWT_SECRET_COOKIE;
const uri = process.env.DB_URL || undefined;
const expire = process.env.JWT_EXPIRE_IN;
const reminder = process.env.JWT_REMINDER_EXPIRE_AT;
const production = process.env.NODE_ENV === "production";

export const NOT_ADMIN =
  "Access Denied: You are authenticated, but your token does not have the necessary permissions to access this resource.";
export const NOT_USER =
  "Access Denied: No token provided. Please log in to access this resource.";
export const NO_TOKEN =
  "Access Denied: The token is invalid or has expired. Please log in again to access this resource.";
