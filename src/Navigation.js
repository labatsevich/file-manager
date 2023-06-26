import fs from 'node:fs/promises';
import path from 'node:path';
import { isExists, isDirectory } from './helpers.js';
import { MESSAGE } from './settings.js';

class Navigation {

    current_path;

    constructor(homedir) {
        this.current_path = homedir;
    }

    async ls(currentDir){

        try{
        const entries =  await fs.readdir(currentDir,{withFileTypes:true});
        const collection = entries.sort((a,b) => a.isFile() - b.isFile()).filter(item => !item.isSymbolicLink()).map((item) =>({
            Name:item.name,
            Type: item.isFile() ? "file" : "directory" 
        }));

        console.table(collection)

        }
        catch{
            process.stdout.write(`${MESSAGE.FAILED}`);
        }
        
    }

    up(prevPath) {
        const newPath = path.join(prevPath, '..');
        if (isExists(newPath) && isDirectory(newPath)) {
            return newPath;
        }
        return prevPath;
    }

    async cd(prevPath, dirPath) {

        if(dirPath.indexOf(':')===1){
            dirPath = path.normalize(`${dirPath}${path.sep}`);
        }

        if (!path.isAbsolute(dirPath)) {
            
            dirPath = path.normalize(path.join(prevPath, dirPath));
            
        }
        else{
            console.log(dirPath)
        }
        try {
            
            const stats = await fs.stat(dirPath);

            if (stats && stats.isDirectory()) {
                return dirPath
            }
            else {
                throw new Error()
            }
        } catch {
            process.stdout.write(`${MESSAGE.FAILED}`)
            return prevPath
        }

    }

}




export default Navigation;