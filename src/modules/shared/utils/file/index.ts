import { FILE_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/file.service.contract';
import { File } from '@/modules/shared/utils/file/file';
import { Provider } from '@nestjs/common';

export const FileService: Provider = {
  provide: FILE_SERVICE_TOKEN,
  useValue: new File(),
};
