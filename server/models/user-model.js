const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  },
  function (err) {
    next(err);
  }
);

userSchema.methods.comparePassword = function (
  candidatePassword,
  password,
  next
) {
  bcrypt.compare(candidatePassword, password, function (error, isMatch) {
    if (error) return next(err);
    next(null, isMatch);
  });
};

module.exports = mongoose.model("user", userSchema);
