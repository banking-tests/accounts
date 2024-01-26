import { Path } from '@/modules/shared/utils/path/path';

describe('Path', () => {
  const path = new Path();

  it('should be defined', () => {
    expect(path).toBeDefined();
  });

  it('should return root path', () => {
    const rootPath = path.getRootPath();
    expect(rootPath).toBe(__dirname.replace(/dist/, ''));
  });
});
