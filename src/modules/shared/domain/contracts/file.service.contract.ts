export const FILE_SERVICE_TOKEN = 'FileService';

export interface FileService {
  getExtension(filename: string): string | undefined;
  getOriginalName(originalName: string): string | undefined;
  getUniqueName(originalName: string): string | undefined;
}
