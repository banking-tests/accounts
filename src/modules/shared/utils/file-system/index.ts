import { FILE_SYSTEM_SERVICE_TOKEN } from '@/modules/shared/domain/contracts/file-system.service.contract';
import { FileSystem } from '@/modules/shared/utils/file-system/file-system';

export const FileSystemService = {
  provide: FILE_SYSTEM_SERVICE_TOKEN,
  useValue: new FileSystem(),
};
