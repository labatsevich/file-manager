import { fontColor as fc, resetColor as rc } from './settings.js';
import { stdout as output } from 'node:process';
import os from 'node:os';

class OSInfo {

  eol() {
    output.write(JSON.stringify(os.EOL));
  }

   cpus() {
    const cpus = os.cpus();
    output.write(`Your host machine has ${cpus.length} CPUS`);
    os.cpus().forEach((info) => {
      const { model, speed } = info;
      output.write(`${fc} \nModel: ${model}, Clock rate: ${speed / 1000}GHz ${rc}`);
    });
  }

   architecture() {
    output.write(`${fc} Operating system CPU architecture: ${os.arch()} ${rc} \n`);
  }

   homedir() {
    output.write(`${fc} Home directory: ${os.homedir()} ${rc} \n`)
  }

   username() {
    const { username } = os.userInfo();
    output.write(`${fc} Current system user name : ${username} ${rc} \n`)
  }

}

export default OSInfo;