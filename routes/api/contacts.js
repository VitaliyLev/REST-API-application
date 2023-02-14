const express = require("express");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
} = require("../../controllers/contactsControllers");

const { tryCatchWrap } = require("../../helpers/index");
const { validateBody } = require("../../middlewares/index");
const { contactsSchema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", tryCatchWrap(getContacts));

router.get("/:contactId", tryCatchWrap(getContact));

router.post("/", validateBody(contactsSchema), tryCatchWrap(createContact));

router.delete("/:contactId", tryCatchWrap(deleteContact));

router.put(
  "/:contactId",
  validateBody(contactsSchema),
  tryCatchWrap(updateSomeContact)
);

module.exports = router;
