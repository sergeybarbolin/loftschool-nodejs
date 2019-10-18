const fs = require('mz/fs')
const path = require('path');

const base = './files';
const newDir = './newfiles';

const readDir = (base, level) => {
  return fs.readdir(base)
    .then(files => {
      files.forEach(async (item) => {
        const localBase = path.join(base, item);
        const directory = await fs.stat(localBase).then(state => state.isDirectory())

        if (directory) {
          readDir(localBase, level + 1);
        } else {
          const folderName = path.join(newDir, item[0].toUpperCase());
          const newPathFile = path.join(newDir, item[0].toUpperCase(), item);
          
          await fs.mkdir(folderName).catch(err => err.message);

          fs.copyFile(localBase, newPathFile)
            .then(() => { console.log(`Copied ${item} to ${folderName}`) })  
            .catch(err => { console.log(err.message) });
        }
      })
    })
    .catch(err => {
      console.error(err.message);
      return;
    });
}

readDir(base, 0);