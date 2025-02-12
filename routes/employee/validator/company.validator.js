import Joi from 'joi';

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string().allow('').optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string()
      .pattern(/^\d{6}$/)
      .message('Invalid Zipcode.')
      .required()
  }).required(),
  contact: Joi.string()
    .pattern(/^\d{10}$/)
    .message('Invalid Contact Number.')
    .required(),
  status: Joi.string().valid('active', 'inactive').required()
}).options({ allowUnknown: true });

const updateCompanySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string().allow('').optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string()
      .pattern(/^\d{6}$/)
      .message('Invalid Zipcode.')
      .required()
  }).required(),
  contact: Joi.string()
    .pattern(/^\d{10}$/)
    .message('Invalid Contact Number.')
    .required(),
  status: Joi.string().valid('active', 'inactive').required()
}).options({ allowUnknown: true });

export const companyValidator = { createCompanySchema, updateCompanySchema };
