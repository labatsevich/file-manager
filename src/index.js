import { stdin as input, stdout as output, stdout } from 'node:process';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline/promises';
import OSInfo from './info.js';
import Navigation from './navigation.js';
import { cat,add,rn,cp,rm,mv } from './files.js';
import { calculate } from './hash.js';
import { MESSAGE } from './settings.js';
import { compress,decompress } from './brotli.js';

let username;
let currentDir = os.homedir();
const cliArgs = process.argv.slice(2).join('');

const sysInfo = new OSInfo();
const navigator = new Navigation(currentDir);


if (cliArgs.indexOf('--username') !== -1) {
  username = cliArgs.split('=').pop();
  stdout.write(`\nWelcome to the File Manager, ${username}!\nYou are currently in ${currentDir}\n`);
}
else {
  stdout.write('Incorrect command! \nType \'npm run start -- --username=your_username\'\n and try again!')
  process.exit();
}


const rl = readline.createInterface({ input, output });

rl.on('line', async (line) => {

  if (line === '.exit') {
    stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`)
    process.exit();
  }

  else if (line.startsWith('os')) {

    const method = line.slice(5).toLowerCase();
    try {
      sysInfo[method]();
      stdout.write(`\nYou are currently in ${currentDir}\n`);
    } catch {
      stdout.write(`${MESSAGE.INVALID}`);
    }
  }


  else if (line.startsWith('cd')) {

    const method = line.slice(0, 2).toLowerCase();
    const params = line.split(' ');
    let newDir = params[params.length - 1];

    try {
      currentDir = await navigator.cd(currentDir, newDir);
    } catch (err) {
      output.write(err)
    }

    stdout.write(`\nYou are currently in ${currentDir}\n`);

  }

  else if (line.startsWith('up')) {
    currentDir = navigator.up(currentDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if (line.startsWith('ls')) {
    await navigator.ls(currentDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if (line.startsWith('cat')) {
    const fileName = line.split(' ').pop();
    await cat(currentDir,fileName);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if (line.startsWith('add')) {
    const fileName = line.split(' ').pop();
    await add(currentDir,fileName);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if(line.startsWith('rn')){
    const [fromFileName, toFileName] = line.slice(3).split(' '); 
    const src = path.resolve(currentDir,fromFileName);
    const srcDir = path.parse(src).dir;
    const dest = path.resolve(srcDir,toFileName);
    await rn(src,dest);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if(line.startsWith('cp')){

    const [fileName,newDir] = line.slice(3).split(' ');
    const pathToFile = path.resolve(currentDir,fileName); 
    await cp(pathToFile,newDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);

  }

  else if(line.startsWith('rm')){

    const fileName = line.slice(3).trim().replace(/--/,'');
    const pathToFile = path.resolve(currentDir,fileName); 
    await rm(pathToFile);
    stdout.write(`\nYou are currently in ${currentDir}\n`);

  }

  else if(line.startsWith('mv')){
    const [fileName,newDir] = line.slice(3).split(' ');
    const pathToFile = path.resolve(currentDir,fileName); 
    await mv(pathToFile,newDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if(line.startsWith('hash')){
    const fileName = line.slice(4).trim().replace(/--/,'');
    const pathToFile = path.resolve(currentDir,fileName); 
    await calculate(pathToFile);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if(line.startsWith('compress')){
    const [srcFileName, destFileName] = line.slice(8).trim().split(' ');
    const pathToFile = path.resolve(currentDir,srcFileName); 
    const pathToDest = path.resolve(currentDir,destFileName); 
    await compress(pathToFile,pathToDest);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else if(line.startsWith('decompress')){
    const [srcFileName, destFileName] = line.slice(10).trim().split(' ');
    const pathToFile = path.resolve(currentDir,srcFileName); 
    const pathToDest = path.resolve(currentDir,destFileName); 
    await decompress(pathToFile,pathToDest);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  else {
    stdout.write(`${MESSAGE.INVALID}`);
  }

});

rl.on('SIGINT', () => {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
});