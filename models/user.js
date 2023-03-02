const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usertSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 10,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    avatarURL: {
      type: String,
      required: true,
    },

    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
});

const verrifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", usertSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
  verrifyEmailSchema,
};
