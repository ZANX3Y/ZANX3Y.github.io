const fs = require('fs');
const path = require('path');

const srcFile = process.argv[2];
const event = process.argv[3];
if (!srcFile) {
    console.error("No file specified");
    process.exit(1);
}

const distFile = path.join(
    'dist',
    path.relative('src', srcFile)
);

if (event === 'unlink') {
    fs.rmSync(distFile, { force: true });
    console.log(`deleted:${distFile}`);
} else {
    fs.mkdirSync(path.dirname(distFile), { recursive: true });
    fs.copyFileSync(srcFile, distFile);
    console.log(`updated:${distFile}`);
}
