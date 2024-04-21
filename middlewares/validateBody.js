const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error: validationError } = schema.validate(req.body);
    if (validationError) {
      next(HttpError(400, validationError.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
