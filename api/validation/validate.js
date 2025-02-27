export const validate =
  (schema, target = "body") =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req[target]); // يمكن التحقق من body أو params أو query
      next();
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        errors: error.errors.map((e) => e.message), // استخراج الرسائل فقط
      });
    }
  };
//
export const validated = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};
export const validateMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.params);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};
export const validateData = (schema) => (req, res, next) => {
  const { error } = schema.parse(req.body);
  next();
  if (error) {
    return res.status(400).json({ error: error.map((e) => e.message) });
  }
};
