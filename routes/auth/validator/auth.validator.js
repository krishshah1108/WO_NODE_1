import Joi from 'joi';

const userRegistrationSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  designation: Joi.string().valid('SUPER_ADMIN', 'MANAGER', 'TEAM_LEADER', 'DEVELOPER').required(),
  companyId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .message('Invalid companyId'),
  isVerified: Joi.boolean().required(),
  reporters: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .required()
    .message('Invalid reporterId'),
  code: Joi.number().optional().allow(null).default(null),
  refreshToken: Joi.string().optional(),
}).options({ allowUnknown: true });

const userLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export const authValidator = {
  userRegistrationSchema,
  userLoginSchema,
};
