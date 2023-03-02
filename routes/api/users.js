const express = require("express");
const { auth } = require("../../midlwares/auth");

const { upload } = require("../../midlwares/upload");

const usr = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, usr.getCurent);

router.patch("/avatars", auth, upload.single("avatar"), usr.updateAvatar);

module.exports = router;
