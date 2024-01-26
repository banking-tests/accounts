import { Url } from '@/modules/shared/utils/url/url';

describe('Url', () => {
  const url = new Url();

  it('should be defined', () => {
    expect(url).toBeDefined();
  });

  it('should get empty path from a home website', () => {
    const uri = 'https://www.google.com';
    const path = url.getPath(uri);
    expect(path).toBe('');
  });

  it('should get a path from a friendly url', () => {
    const uri = 'https://www.google.com/search';
    const path = url.getPath(uri);
    expect(path).toBe('search');
  });

  it('should get a path from a file', () => {
    const uri = 'https://www.google.com/search/index.html';
    const path = url.getPath(uri);
    expect(path).toBe('search/index.html');
  });
});
