import { Provider } from '@nestjs/common';

import { PATH_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/path.service.contract';
import { Path } from '@/modules/shared/utils/path/path';

export const PathService: Provider = {
  provide: PATH_SERVICE_TOKEN,
  useValue: new Path(),
};
