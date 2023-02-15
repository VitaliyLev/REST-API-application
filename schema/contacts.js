const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const updateStatusSchema = Joi.object({ favorite: Joi.boolean().optional() });

module.exports = {
  contactsSchema,
  updateStatusSchema,
};
