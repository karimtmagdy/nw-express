export const validate = (schema) => (req, res, next) => {
  const { error } = schema.parse(req.body);
  next();
  if (error) {
    return res.status(400).json({ error: error.map((e) => e.message) });
  }
};
export const validateData = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
};
