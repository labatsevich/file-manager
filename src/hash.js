const { createHash } = await import('node:crypto');
import {createReadStream} from 'node:fs';
import { stdout as output } from 'node:process';
import { isExists } from './helpers.js';
import { MESSAGE } from './settings.js';

export const calculate = async(pathToFile) =>{

    if(isExists(pathToFile)){

        const _hash =  createHash('sha256');
        const readable = createReadStream(pathToFile);
        readable.on('error',(err)=>output.write(`${MESSAGE.FAILED}`))
        .pipe(_hash)
        .setEncoding('hex')
        .on('error',(err)=> output.write(`${MESSAGE.FAILED}\n`))
        .pipe(output);
    
    }
    else{

        output.write(`${MESSAGE.FAILED}\n`)

    }
   
    


};