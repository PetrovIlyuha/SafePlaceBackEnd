exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Don't FORGET to put in some TITLE TEXT").notEmpty();
  req
    .check(
      "title",
      "Yout title is too short, must be at least 6 characters long.."
    )
    .isLength({
      min: 6,
      max: 140
    });
  // body
  req.check("body", "Don't FORGET to put in some BODY TEXT").notEmpty();
  req
    .check(
      "body",
      "Yout body is too short, must be at least 6 characters long.."
    )
    .isLength({
      min: 6,
      max: 1400
    });
  // check got errors
  const errors = req.validationErrors();
  // if error show the first one as they appear
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 200
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be 6 characters long at least...")
    .matches(/\d/)
    .withMessage("Password must contain at least one numerical character");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they appear
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
