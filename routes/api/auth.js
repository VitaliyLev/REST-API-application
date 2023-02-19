const express = require("express");
const { validateBody } = require("../../midlwares/validateBody");
const { auth } = require("../../midlwares/auth");
const reg = require("../../controllers/register");
const log = require("../../controllers/login");
const logu = require("../../controllers/logout");
const su = require("../../controllers/sub");
const {
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(joiRegisterSchema), reg.register);
router.post("/login", validateBody(joiLoginSchema), log.login);
router.post("/logout", auth, logu.logout);
router.patch(
  "/subscription",
  auth,
  validateBody(subscriptionJoiSchema),
  su.updateSubscription
);

module.exports = router;
