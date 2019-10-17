const fs = require('mz/fs')
const path = require('path');

const base = './files';
const newDir = './newfiles';

const readDir = (base, level) => {
  return fs.readdir(base)
    .then(files => {
      files.forEach(item => {
        const localBase = path.join(base, item);
  
        fs.stat(localBase)
          .then(state => state.isDirectory())
          .then(directory => {
            if (directory) {
              readDir(localBase, level + 1);
            } else {
              return item;
            }
          })
          .then(fileName => {
            const folderName = path.join(newDir, item[0].toUpperCase());
            const newPathFile = path.join(newDir, item[0].toUpperCase(), fileName);

            fs.mkdir(folderName, err => {
              if (err && err.code !== 'EEXIST') {
                console.log(err.message);
                return;
              }
              fs.link(localBase, newPathFile, err => {
                if (err) {
                  console.error(`Файл ${newPathFile} уже существует.`);
                  return;
                }
      
                console.log(`Copied ${item} to ${folderName}`);
              });
    
            });
          })
          .catch(err => {
            console.error(err.message);
            return;
          });
      })
    })
    
    .catch(err => {
      console.error(err.message);
      return;
    });
}

readDir(base, 0);