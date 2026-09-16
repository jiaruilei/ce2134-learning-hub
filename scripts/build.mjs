import {mkdir,copyFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const destination=path.join(root,'dist');
async function copyFolder(folder){
  await mkdir(path.join(destination,folder),{recursive:true});
  for(const entry of await readdir(path.join(root,folder),{withFileTypes:true})){
    if(entry.isDirectory()) await copyFolder(path.join(folder,entry.name));
    else if(entry.name.endsWith('.js')) await copyFile(path.join(root,folder,entry.name),path.join(destination,folder,entry.name));
  }
}
await mkdir(destination,{recursive:true});
for(const file of ['index.html','styles.css','app.js','favicon.svg']) await copyFile(path.join(root,file),path.join(destination,file));
for(const folder of ['content','lib']) await copyFolder(folder);
console.log('Static site built in dist/');
