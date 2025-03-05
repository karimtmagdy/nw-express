import jwt from "jsonwebtoken";
export const JWTauth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = jwt.decode(token);
    console.log(jwt.decode(token))
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = (req, res, next) => {
  JWTauth(req, res, () => {
    if (req.user.role === "admin") {
      console.log(req.user.role);
      next();
    } else {
      console.log(req.user.role);
      return res.status(403).json({ message: "Forbidden" });
    }
  });
};
