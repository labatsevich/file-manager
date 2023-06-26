import path from 'node:path';
import fs, { copyFile, mkdir } from 'node:fs/promises';
import { stdout as output } from 'node:process';
import { isFile, isExists } from './helpers.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { MESSAGE } from './settings.js';
import { pipeline } from 'node:stream/promises';


export const cat = async (currentDir, pathToFile) => {

  const filePath = path.join(currentDir, pathToFile);
  try {
    if (isFile(filePath)) {
      const rs = createReadStream(filePath, { encoding: 'utf-8' });
      rs.pipe(output);
      rs.on('end', () => output.write('\n'))
    }
  } catch {
    output.write(MESSAGE.FAILED);
  }

}

export const add = async (currentDir, fileName) => {

  const filePath = path.join(currentDir, fileName);
  try {
    await writeFile(filePath, '', { flag: 'wx+' })
  } catch {
    output.write(MESSAGE.FAILED);
  }

};


export const rn = async (fromFileName, toFileName) => {

  const exist = await isExists(toFileName);
  if (!exist) {
    await fs.rename(fromFileName, toFileName);
  }
  else {
    output.write(MESSAGE.FAILED);
  }

}


export const cp = async (pathToFile, newDir) => {

  
  const filename = path.basename(pathToFile);
  const currentDir = path.dirname(pathToFile);

  if(!path.isAbsolute(newDir)){
    newDir  = path.resolve(currentDir,newDir);
    console.log(newDir);
  }

  const exist = await isExists(newDir)
  
  if (!exist) {
    try {
      await mkdir(newDir, { recursive: true });
      const readable = createReadStream(pathToFile);
      const writable = createWriteStream(path.join(newDir, filename));
      await pipeline(readable, writable);
    }
    catch {
      output.write(MESSAGE.FAILED);
    }

  }

}

export const rm = async (pathToFile) => {

  if (isExists(pathToFile)) {

    try {
      await fs.rm(pathToFile);
      output.write(MESSAGE.REMOVED)
    } catch {
      output.write(MESSAGE.FAILED)
    }

  }
  else {
    console.write(MESSAGE.FAILED)
  }


}

export const mv = async (pathToFile, newDir) => {

  await cp(pathToFile, newDir);
  await rm(pathToFile);
  output.write(MESSAGE.REMOVED)

}