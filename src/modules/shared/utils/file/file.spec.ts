import { File } from '@/modules/shared/utils/file/file';

describe('File', () => {
  const file = new File();

  it('should be defined', () => {
    expect(file).toBeDefined();
  });

  it('should get extension', () => {
    const filename = 'test.txt';
    const extension = file.getExtension(filename);
    expect(extension).toBe('txt');
  });

  it('should get original name', () => {
    const originalName = 'test.txt';
    const name = file.getOriginalName(originalName);
    expect(name).toBe('test');
  });

  it('should get unique name', () => {
    const originalName = 'test.txt';
    const name = file.getUniqueName(originalName);
    expect(name).toMatch(/^\d+-test-[0-9a-z]+.txt$/);
  });
});
