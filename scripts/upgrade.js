const https = require('https');
const fs = require('fs');

async function request(url) {
    return new Promise((resolve) => https.request(url, { method: 'GET' }, (response) => {
        let result = '';
        response.on('end', () => resolve(result));
        response.on('data', (data) => {
            result += data;
        });
    }).end());
}

async function save(filename, contents) {
    return new Promise((resolve) => fs.writeFile(filename, contents, undefined, resolve));
}

(async () => {
    const data = await request('https://github.com/lugocorp/wildflower/file-list/main/wildflower');
    const fileRegex = new RegExp(/\/lugocorp\/wildflower\/blob\/main\/wildflower\/[A-Za-z\-]+\.ts/g);
    const files = data.match(fileRegex) || [];
    console.log(`Found ${files.length} files to upgrade.`);
    for (const file of files) {
        const filename = file.replace('/lugocorp/wildflower/blob/main/wildflower/', '');
        const url = `https://raw.githubusercontent.com/lugocorp/wildflower/main/wildflower/${filename}`;
        console.log(`Upgrading ${filename}...`);
        const contents = await request(url);
        await save(`wildflower/${filename}`, contents);
    }
    console.log(`Upgrade complete.`);
})();