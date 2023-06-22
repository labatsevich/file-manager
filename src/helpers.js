import fs from 'node:fs/promises';

export const isExists = async (path) => {

  try {
    await fs.access(path);
    return true;
  }
  catch {
    return false;
  }

}


export const isDirectory = async (path) => {

  try {
    const stats = await fs.stat(path);
    if (stats) {
      return stats.isDirectory();
    }
    else {
      throw new Error
    }
  }
  catch {
    throw new Error
  }


}

export const isFile = async (path) => {

  const stats = await fs.stat(path);
  return stats.isFile();

}