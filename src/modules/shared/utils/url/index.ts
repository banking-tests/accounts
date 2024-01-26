import { Provider } from '@nestjs/common';

import { URL_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/url.service.contract';
import { Url } from '@/modules/shared/utils/url/url';

export const UrlService: Provider = {
  provide: URL_SERVICE_TOKEN,
  useValue: new Url(),
};
