const { NotFound } = require("http-errors");
const { Contact } = require("../models/contact");
const { ctrlWrappers } = require("../helpers/ctrlWrappers");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email");

  res.json({
    status: "succes",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await Contact.findById(contactId);
  if (!contacts) {
    throw new NotFound(`Sorry, contact with contactId ${contactId} not found`);
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      contacts,
    },
  });
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const added = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "succes",
    code: 201,
    data: { added },
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const update = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!update) {
    throw new NotFound(`Sorry, contact with contactId ${contactId} not found`);
  }
  res.json({
    status: "succes",
    code: 200,
    data: { update },
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const update = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!update) {
    throw new NotFound(`Sorry, contact with contactId ${contactId} not found`);
  }
  res.json({
    status: "succes",
    code: 200,
    data: { update },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const delet = await Contact.findByIdAndRemove(contactId);
  if (!delet) {
    throw new NotFound(`Sorry, contact with contactId ${contactId} not found`);
  }
  res.json({
    status: "succes",
    code: 200,
    message: "contact deleted",
    data: { delet },
  });
};

module.exports = {
  listContacts: ctrlWrappers(listContacts),
  getContactById: ctrlWrappers(getContactById),
  addContact: ctrlWrappers(addContact),
  updateById: ctrlWrappers(updateById),
  updateFavorite: ctrlWrappers(updateFavorite),
  removeContact: ctrlWrappers(removeContact),
};
