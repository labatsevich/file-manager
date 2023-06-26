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

    const stats = await fs.stat(path);
    return stats.isDirectory();

}

export const isFile = async (path) => {

  const stats = await fs.stat(path);
  return stats.isFile();

}