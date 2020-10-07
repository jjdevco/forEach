const jwt = require("json-web-token");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (authorization && authorization.includes("Bearer ")) {
    const token = authorization.split("Bearer ")[1];

    jwt.decode(process.env.ACCESS_TOKEN_SECRET, token, function (
      error,
      decodedPayload
    ) {
      if (error) {
        console.error(error.name, error.message);
        return res.status(500).send({ message: error.message });
      } else {
        req.user = decodedPayload;
        next();
      }
    });
  } else {
    return res.status(403).send();
  }
}

module.exports = authMiddleware;
