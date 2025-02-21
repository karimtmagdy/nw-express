export const no_token = "No authentication token provided. Please login.";
export const invalid_token = "Invalid or expired token. Please login again.";
export const not_admin = "Access restricted: Admins only.";
export const verification_failed = "Token verification failed. Access denied.";

export const development = process.env.NODE_ENV;
export const production = process.env.NODE_ENV === "production";
export const port = process.env.PORT || 8000;
export const jwt_access_token = process.env.JWT_ACCESS_TOKEN;
export const jwt_refresh_token = process.env.JWT_REFRESH_TOKEN;
// 
export const jwt_secret_cookie = process.env.JWT_SECRET_COOKIE;
export const jwt_secret_key = process.env.JWT_SECRET_KEY;
export const jwt_expire_in = process.env.JWT_EXPIRE_IN;
export const jwt_expire_at = process.env.JWT_EXPIRE_AT;
export const jwt_reminder_expire_at = process.env.JWT_REMINDER_EXPIRE_AT;
export const jwt_expire_in_reminder = process.env.JWT_EXPIRE_IN_REMINDER;
export const msg_api = "Message : API is connected Successfully";
export const uri = process.env.MONGO_URI;
export const db_pass = process.env.DB_PASSWORD;


// export const uploadDir = process.env.UPLOAD_DIR;
