const { ctrlWrappers } = require("../helpers/ctrlWrappers");
const { User } = require("../models/user");
const { Conflict } = require("http-errors");
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Sorry, user with  ${email} in use`);
  }
  const hashBacryptjs = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const result = await User.create({ name, email, password: hashBacryptjs });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = {
  register: ctrlWrappers(register),
};
