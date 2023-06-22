import { stdin as input, stdout as output, stdout } from 'node:process';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline/promises';
import OSInfo from './info.js';
import Navigation from './navigation.js';

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

  if (line.startsWith('os')) {

    const method = line.slice(5).toLowerCase();
    try {
      sysInfo[method]();
      stdout.write(`\nYou are currently in ${currentDir}\n`);
    } catch {
      stdout.write('Invalid command\n');
    }
  }


  if (line.startsWith('cd')) {

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

  if (line.startsWith('up')) {
    currentDir = navigator.up(currentDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

  if (line.startsWith('ls')) {
    await navigator.ls(currentDir);
    stdout.write(`\nYou are currently in ${currentDir}\n`);
  }

});

rl.on('SIGINT', () => {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
});