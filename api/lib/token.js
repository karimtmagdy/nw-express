import jwt from "jsonwebtoken";
export const generateAccessToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
export const generateRefreshToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });
};
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
};
export const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
};
export const verifyToken=(token,param)=>{
return jwt.verify(token, process.env[param]);
}