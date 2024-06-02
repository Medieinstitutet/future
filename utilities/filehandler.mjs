import { appendFileSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join as joinPath } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileHandler {
  constructor(folder, filename) {
    this.pathname = joinPath(__dirname, '..', folder, filename); // Adjusted to navigate one directory up
    this.ensureFileExists();
  }

  ensureFileExists() {
    if (!existsSync(this.pathname)) {
      writeFileSync(this.pathname, JSON.stringify({}, null, 2));
    }
  }

  append(data) {
    try {
      appendFileSync(this.pathname, `${data}\n`, 'utf8');
    } catch (error) {
      throw error;
    }
  }

  read(isJSON = false) {
    try {
      const data = readFileSync(this.pathname, 'utf8');
      if (isJSON) {
        return JSON.parse(data);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  write(data) {
    try {
      writeFileSync(this.pathname, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      throw error;
    }
  }

  appendJSON(data) {
    try {
      const existingData = this.read(true);
      const newData = { ...existingData, ...data };
      this.write(newData);
    } catch (error) {
      throw error;
    }
  }
}

export default FileHandler;
