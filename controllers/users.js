const { ctrlWrappers } = require("../helpers/ctrlWrappers");

const getCurent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "succes",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = {
  getCurent: ctrlWrappers(getCurent),
};
