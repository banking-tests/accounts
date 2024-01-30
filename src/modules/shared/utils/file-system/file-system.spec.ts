import { FileSystem } from '@/modules/shared/utils/file-system/file-system';

describe('FileSystem', () => {
  const service = new FileSystem();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a string', () => {
    const template = service.read('index.ts');
    expect(template).toBeTruthy();
  });
});
