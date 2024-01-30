import * as Joi from 'joi';

const isTestEnvironment = process.env.NODE_ENV === 'testing';

export const databaseSchema = Joi.object({
  DB_HOST: isTestEnvironment ? Joi.string().optional() : Joi.string().required().hostname(),
  DB_PORT: Joi.number().optional(),
  DB_USERNAME: Joi.string().optional(),
  DB_PASSWORD: Joi.string().optional(),
  DB_DATABASE: Joi.string().optional(),
});
