const fs = require('fs');
const path = require('path');

const loadFiles = (folder, nested = false) => {
  const basePath = path.join(__dirname, '..', folder);
  
  if (!nested) {
    return processJSFiles(basePath);
  }

  const folders = fs.readdirSync(basePath);
  return folders.flatMap(folder => {
    const folderPath = path.join(basePath, folder);
    return processJSFiles(folderPath);
  });
};

const processJSFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.js'))
    .map(file => ({
      name: file,
      path: path.join(dir, file),
      module: require(path.join(dir, file))
    }));
};

module.exports = { loadFiles };