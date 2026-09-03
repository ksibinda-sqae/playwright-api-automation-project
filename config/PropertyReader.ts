import fs from 'fs';
import path from 'path';

export class PropertyReader {
  private readonly properties: Map<string, string> = new Map();

  constructor(filePath: string) {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    fileContent.split(/\r?\n/).forEach((line) => {
      const trimmedLine = line.trim();

      // Ignore empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return;
      }

      const key = trimmedLine.substring(0, separatorIndex).trim();
      const value = trimmedLine.substring(separatorIndex + 1).trim();

      this.properties.set(key, value);
    });
  }

  get(key: string): string {
    const value = this.properties.get(key);

    if (value === undefined) {
      throw new Error(`Property '${key}' not found`);
    }

    return value;
  }
}
