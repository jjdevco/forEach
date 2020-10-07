const jwt = require("json-web-token");

const User = require("../models/user-model");

exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(401).send();
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).send({ message: "this user doesn't exist" });
    }

    user.comparePassword(password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }

      if (!isMatch) {
        return res
          .status(401)
          .send({ message: "the user password is invalid" });
      }

      jwt.encode(
        process.env.ACCESS_TOKEN_SECRET,
        { name: user.name, email: user.email, role: user.role },
        (error, token) => {
          if (error) {
            return res.status(400).send({ message: error.message });
          }

          res.status(200).send(token);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.init = async (req, res) => {
  let secret = req.body.secret;

  if (!secret || secret !== process.env.INIT_SECRET) {
    return res.status(401).send();
  }

  try {
    const user = await User.findOne({ email: "admin@mail.com" }).exec();

    if (user) {
      return res.status(412).send();
    }

    const adminUser = {
      name: "admin",
      email: "admin@mail.com",
      role: "admin",
    };

    await new User({ ...adminUser, password: "adminpass" }).save();

    jwt.encode(process.env.ACCESS_TOKEN_SECRET, adminUser, (error, token) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(200).send(token);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};
