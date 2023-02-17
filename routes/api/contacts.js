const express = require("express");
const ctrl = require("../../controllers/contacts");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validateBody } = require("../../midlwares/validateBody");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(joiSchema), ctrl.addContact);

router.put("/:contactId", validateBody(joiSchema), ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateBody(favoriteJoiSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
