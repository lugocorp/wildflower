const { spawn } = require('child_process');
const fs = require('fs');

async function copy(src, dst) {
    return new Promise((resolve) => fs.copyFile(src, dst, (err) => {
        if (err) {
            throw err;
        }
        resolve();
    }));
}

async function webpack() {
    const args = process.argv.splice(2, process.argv.length - 2);
    const pid = spawn('webpack', args);
    pid.stdout.pipe(process.stdout);
    pid.stderr.pipe(process.stderr);
    return new Promise((resolve) => pid.on('close', resolve));
}

(async function () {
    await copy('node_modules/cordova-browser/cordova-lib/cordova.js', 'www/cordova.js');
    await webpack();
})();
