export const PATH_SERVICE_TOKEN = 'PathService';

export interface PathService {
  getRootPath(): string;
  join(...paths: string[]): string;
  resolve(...paths: string[]): string;
}
