import {mkdir,copyFile,readdir,cp} from 'node:fs/promises';
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
for(const file of ['index.html','styles.css','app.js','favicon.svg','mathjax-config.js']) await copyFile(path.join(root,file),path.join(destination,file));
for(const folder of ['content','lib']) await copyFolder(folder);
await cp(path.join(root,'assets'),path.join(destination,'assets'),{recursive:true});
await cp(path.join(root,'node_modules','mathjax'),path.join(destination,'vendor','mathjax'),{recursive:true});
await cp(path.join(root,'node_modules','@mathjax','mathjax-newcm-font'),path.join(destination,'vendor','mathjax-newcm-font'),{recursive:true});
console.log('Static site built in dist/');
