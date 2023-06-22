import fs from 'node:fs';
import path from 'node:path';

class Navigation{
    
    __path;
    __homedir;

    constructor(homedir){
        this.__path = homedir;
        this.__homedir = homedir;
    }

    up(filename,path){

    }

    async cd(dirPath){

        if(!path.isAbsolute(dirPath)){
            dirPath = path.resolve(this.__path,dirPath);
            

        }

    }

};

export default Navigation;