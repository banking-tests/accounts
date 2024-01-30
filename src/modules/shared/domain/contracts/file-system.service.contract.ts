export const FILE_SYSTEM_SERVICE_TOKEN = 'FileSystemService';

export interface FileSystemService {
  read(filePath: string): string;
}
