const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
const { ctrlWrappers } = require("../helpers/ctrlWrappers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw new Unauthorized(
      `Sorry, user with ${email} or password is wrong or not verify`
    );
  }
  const pastCompare = bcryptjs.compareSync(password, user.password);
  if (!pastCompare) {
    throw new Unauthorized(
      `Sorry, user with ${email} or password is wrong or not verify`
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "succes",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = {
  login: ctrlWrappers(login),
};
