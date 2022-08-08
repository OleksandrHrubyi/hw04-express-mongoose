const Joi = require("joi");
const patterName = /^[а-яА-ЯёЁa-zA-Z]+$/
const patternEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
const patternPhone = /^\+?[3][-\(]?\d{4}\)?-?\d{3}-?\d{2}-?\d{2}$/
const patterPassport = /^(?!^0+$)[A-Z0-9]{8,9}$/
const patterBirthday = /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$/

const schemaAddContact = Joi.object({
  name: Joi.string().pattern(new RegExp(patterName)).required(),
  email: Joi.string().pattern(new RegExp(patternEmail)).required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  passport: Joi.string().pattern(new RegExp(patterPassport)).required(),
  birthday: Joi.string().pattern(new RegExp(patterBirthday)).required(),
  favorite: Joi.boolean().optional(),
});

const schemaQueryContact = Joi.object({
  sortBy: Joi.string().valid("name", "id").optional(),
  sortByDesc: Joi.string().valid("name", "id").optional(),
  filter: Joi.string().valid("name", "id", "favorite").optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  offset: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without("sortBy", "sortByDesc");

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validQueryContact: async (req, res, next) => {
    return await validate(schemaQueryContact, req.query, next);
  },
  validCreateContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next);
  },
  validUpdateContacts: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  validUpdateStatus: async (req, res, next) => {
    return await validate(schemaUpdateStatus, req.body, next);
  },
};
