import { URL } from 'url';

import { UrlService } from '@/modules/shared/domain/contracts/url.service.contract';

export class Url implements UrlService {
  public getPath(uri: string, slash = false) {
    const url = new URL(uri);
    return slash ? url.pathname : url.pathname.substring(1);
  }
}
