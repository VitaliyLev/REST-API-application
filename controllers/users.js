const { ctrlWrappers } = require("../helpers/ctrlWrappers");
const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

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
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultupload = path.join(avatarDir, imageName);
    await fs.rename(tempUpload, resultupload);

    Jimp.read(resultupload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(resultupload);
    });

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      status: "succes",
      code: 200,
      data: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  getCurent: ctrlWrappers(getCurent),
  updateAvatar: ctrlWrappers(updateAvatar),
};
