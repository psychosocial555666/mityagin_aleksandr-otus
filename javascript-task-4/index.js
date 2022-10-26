const { readdir } = require('node:fs/promises');

const fs = require('fs');

const pathToFolder = process.env.npm_config_path;

const result = {
    files: [],
    folders: [],
}

async function getPath(path) {
    try {
        const files = await readdir(path);
        if(!files.length) {
            console.log(result)
            return result;
        } else {
            for (const file of files) {
                const fullPath = path + file
    
                fs.stat(fullPath, (err, status) => {
                    if (err) throw err;
                    if (status.isFile()) {
                        result.files.push(fullPath)
                    } else {
                        result.folders.push(fullPath);
                        getPath(fullPath + '/');
                    };
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

function init() {
    return getPath(pathToFolder);
}

init();
