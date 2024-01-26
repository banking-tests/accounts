import { readFileSync } from 'fs';
import { join } from 'path';

import { FileSystemService } from '@/modules/shared/domain/contracts/file-system.service.contract';

export class FileSystem implements FileSystemService {
  public read(path: string): string {
    const pathFile = join(__dirname.replace(/dist/, ''), path);
    const templateString = readFileSync(pathFile).toString('utf-8');
    return templateString;
  }
}
