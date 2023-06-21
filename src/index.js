import { stdin as input, stdout as output, stdout } from 'node:process';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline/promises';

let username;
const __currentDir = os.homedir();
const __cliArguments = process.argv.slice(2).join('');

if(__cliArguments.indexOf('--username')!==-1){
    username = __cliArguments.split('=').pop();
    stdout.write(`\nWelcome to the File Manager, ${username}!\nYou are currently in ${__currentDir}`)
}
else{
  stdout.write('Incorrect command! \nType \'npm run start -- --username=your_username\'\n and try again!')
  process.exit();
}


const rl = readline.createInterface({input,output});

rl.on('line',(line) => {
  
  if(line === '.exit') { 
    stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`)
    process.exit();
  }
  
});

rl.on('SIGINT', () => { 
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
});