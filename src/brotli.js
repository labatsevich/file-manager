import {createReadStream, createWriteStream} from 'node:fs'
import { isExists, isFile } from './helpers.js';
import { pipeline } from 'node:stream';
import {stdout as output} from 'node:process';
import { MESSAGE } from './settings.js';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export const compress = async(pathToFile, pathToDest) => {

    const existsSrc = await isExists(pathToFile);
    const existsDest = await isExists(pathToDest);

    if(existsSrc && isFile(pathToFile) && !existsDest){
        const readable = createReadStream(pathToFile);
        const writeble = createWriteStream(pathToDest);
        const brotli = createBrotliCompress();
        await pipeline(readable,brotli,writeble,(err)=> { 
            if(err)output.write(`${MESSAGE.FAILED}\n`)
        });
        output.write(`${MESSAGE.SUCCESS}`)
    }
    else{
        output.write(`${MESSAGE.FAILED}\n`)
    }

};

export const decompress = async(pathToFile, pathToDest) => {

    const existsSrc = await isExists(pathToFile);
    const existsDest = await isExists(pathToDest);

        if(existsSrc && isFile(pathToFile) && !existsDest){
        const readable = createReadStream(pathToFile);
        const writeble = createWriteStream(pathToDest);
        const brotli = createBrotliDecompress();
        await pipeline(readable,brotli,writeble,(err)=> { 
            if(err)output.write(`${MESSAGE.FAILED}\n`)
        });
        output.write(`${MESSAGE.SUCCESS}`)
    }
    else{
        output.write(`${MESSAGE.FAILED}\n`)
    }

    
};