const { ctrlWrappers } = require("../helpers/ctrlWrappers");
const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const { NotFound, BadRequest } = require("http-errors");
const Jimp = require("jimp");
const { sendEmail } = require("../helpers/sendEmail");

const getCurent = async (req, res) => {
  const { name, email, avatarURL, subscription } = req.user;

  res.json({
    status: "succes",
    code: 200,
    data: {
      user: {
        name,
        email,
        avatarURL,
        subscription,
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

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verify success",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (user.verify) {
    throw new BadRequest(`Verification has already been passed`);
  }
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Прийшла пропозиція</a>`,
  };
  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = {
  getCurent: ctrlWrappers(getCurent),
  updateAvatar: ctrlWrappers(updateAvatar),
  verifyEmail: ctrlWrappers(verifyEmail),
  resendVerifyEmail: ctrlWrappers(resendVerifyEmail),
};
