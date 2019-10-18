const fs = require('fs');
const path = require('path');

const base = './files';
const newDir = './newfiles';

const readDir = (base, level) => {
  fs.readdir(base, (err, files) => {
    if (err) {
      console.error(err.message);
      return;
    }

    files.forEach(item => {
      const localBase = path.join(base, item);

      fs.stat(localBase, (err, state) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (state.isDirectory()) {
          readDir(localBase, level + 1);
        } else {
          const folderName = path.join(newDir, item[0].toUpperCase());
          const newPathFile = path.join(newDir, item[0].toUpperCase(), item);
  
          fs.mkdir(folderName, err => {
            if (err && err.code !== 'EEXIST') {
              console.log(err.code);
              return;
            }
            fs.copyFile(localBase, newPathFile, err => {
              if (err) {
                console.error(err.message);
                return;
              }
    
              console.log(`Copied ${item} to ${folderName}`);
            });
  
          });
        }
      })
    })

  });


}

readDir(base, 0);
