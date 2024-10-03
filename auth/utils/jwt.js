const sendToken = (user, statusCode, res, message) => {
  //Creating JWT Token
  const token = user.getJwtToken();
  const data = {
    userid: user._id,
    role: user.role,
    username: user.username,
    distributor_code: user.distributor_code,
    token: token,
  };
  //setting cookies
  // Calculate the expiration time in milliseconds
  const expirationTimeMilliseconds =
    process.env.COOKIE_EXPIRES_TIME * 60 * 60 * 1000;
  const options = {
    maxAge: expirationTimeMilliseconds,
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options, data).send({
    status: true,
    message,
    data: data,
  });
};

module.exports = sendToken;
