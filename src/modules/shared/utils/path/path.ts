import { sep } from 'path';

import { PathService } from '@/modules/shared/domain/contracts/path.service.contract';

export class Path implements PathService {
  public join(...paths: string[]): string {
    const joinedPath = paths.join(sep);
    return joinedPath;
  }

  public getRootPath(): string {
    const rootPath = __dirname.replace(/\/dist/, '');
    return rootPath;
  }

  public resolve(...paths: string[]): string {
    const resolvedPath = this.join(this.getRootPath(), ...paths);
    return resolvedPath;
  }
}
