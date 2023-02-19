const { ctrlWrappers } = require("../helpers/ctrlWrappers");
const { User } = require("../models/user");

const update = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { ...subscription }, { new: true });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const updatedUser = await update(_id, req.body);

    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateSubscription: ctrlWrappers(updateSubscription),
};
