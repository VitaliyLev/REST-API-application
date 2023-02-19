const express = require("express");
const { auth } = require("../../midlwares/auth");
const usr = require("../../controllers/users");
const router = express.Router();

router.get("/current", auth, usr.getCurent);

module.exports = router;
