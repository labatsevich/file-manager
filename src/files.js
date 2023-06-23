import path from 'node:path';
import { stdout as output } from 'node:process';
import { isFile } from './helpers.js';
import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { MESSAGE } from './settings.js';


export const cat = async (currentDir, pathToFile) => {

  const filePath = path.join(currentDir, pathToFile);
  try {
    if (isFile(filePath)) {
      const rs = createReadStream(filePath, { encoding: 'utf-8' });
      rs.pipe(output);
      rs.on('end', () => output.write('\n'))
    }
  } catch {
    output.write(`${MESSAGE.FAILED}\n`);
  }

}

export const add = async (currentDir, fileName) => {
  
  const filePath = path.join(currentDir, fileName);
    try {
        await writeFile(filePath,'',{flag:'wx+'})
    } catch {
      output.write(`${MESSAGE.FAILED}\n`);
    }

};