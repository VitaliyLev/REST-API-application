const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9()]+$/, "numbers")
    .max(10)
    .required(),
});
module.exports = {
  contactsSchema,
};
