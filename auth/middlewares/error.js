const { CONFLICT_ERROR } = require("../config/constants");
const { Response } = require("http-status-codez");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || Response.HTTP_INTERNAL_SERVER_ERROR;

  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).send({
      status: false,
      message: err.message,
      data: err.name,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);

    if (err.name == "ValidationError" || err.name == "ValidatorError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      err.statusCode = Response.HTTP_UNPROCESSABLE_ENTITY;
    }

    if (err.name == "CastError") {
      message = `Resource not found: ${err.path}`;
      error = new Error(message);
      err.statusCode = Response.HTTP_NOT_FOUND;
    }

    if (err.code == CONFLICT_ERROR) {
      let message = `Duplicate ${Object.keys(err.keyValue)} error`;
      error = new Error(message);
      err.statusCode = Response.HTTP_CONFLICT;
    }

    if (err.name == "JSONWebTokenError" || err.name == "JsonWebTokenError") {
      let message = `JSON Web Token is invalid. Try again`;
      error = new Error(message);
      err.statusCode = Response.HTTP_UNAUTHORIZED;
    }

    if (err.name == "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      error = new Error(message);
      err.statusCode = Response.HTTP_UNAUTHORIZED;
    }

    res.status(err.statusCode).send({
      status: false,
      message: error.message || "Internal Server Error",
      data: [],
    });
  }
};
