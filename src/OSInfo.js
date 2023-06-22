import { fontColor as fc, resetColor as rc } from './settings.js';
import { stdout as output } from 'node:process';
import os from 'node:os';

class OSInfo {

  __username;
  __cpus;

  constructor() {
    const { username } = os.userInfo();
    this.__cpus = os.cpus();
    this.__username = username;
  }

  eol() {
    output.write(JSON.stringify(os.EOL));
  }

  cpus() {
    output.write(`Your host machine has ${this.__cpus.length} CPUS`);
    this.__cpus.forEach((info) => {
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
    output.write(`${fc} Current system user name : ${this.__username} ${rc} \n`)
  }

}

export default OSInfo;