import { Context } from '@/core/domain/interfaces/context.interface';
import { Request as ExpressRequest } from 'express';

export type Request = ExpressRequest & Context;
