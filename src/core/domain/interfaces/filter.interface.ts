import { Json } from '@/core/domain/json';

export type Filter<T> = Partial<T> & Json;
