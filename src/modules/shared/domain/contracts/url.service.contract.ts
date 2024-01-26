export const URL_SERVICE_TOKEN = 'UrlService';

export interface UrlService {
  getPath(uri: string, slash?: boolean): string;
}
