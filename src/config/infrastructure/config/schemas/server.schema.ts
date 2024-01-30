import * as Joi from 'joi';

const isTesting = process.env.NODE_ENV === 'testing';

export const configSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: isTesting ? Joi.number().default(0) : Joi.number().required().port(),
});
