import os from 'node:os';

class OSInfo{

   eol(){
    process.stdout.write(JSON.stringify(os.EOL));
  }

  cpus(){
    const __cpus = os.cpus();
    process.stdout.write(`\n Your host machine has ${__cpus.length} CPUS`);
  }


}

export  default OSInfo;