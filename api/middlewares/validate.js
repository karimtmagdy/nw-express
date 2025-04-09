export const validateData = (schema) => (req, res, next) => {
  const { error } = schema.parse(req.body);
  next();
  if (error) {
    return res.status(400).json({ error: error.map((e) => e.message) });
    // res.status(400).json({error:err.errors.map((e) => e.message).join(", ") })
  }
};
// Verify that password and confirmPassword are in the request body
//   const { password, confirmPassword } = req.body;
// if (!password || !confirmPassword) {
//   return res.status(400).json({ error: "Both password and confirmPassword are required" });
// }

// if (password !== confirmPassword) {
//   return res.status(400).json({ error: "Password and confirmPassword do not match" });
// }
