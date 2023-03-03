const express = require("express");
const ctrl = require("../../controllers/contacts");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validateBody } = require("../../midlwares/validateBody");

const { auth } = require("../../midlwares/auth");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, ctrl.getContactById);

router.post("/", auth, validateBody(joiSchema), ctrl.addContact);

router.put("/:contactId", auth, validateBody(joiSchema), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateBody(favoriteJoiSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
