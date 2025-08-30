const fs = require('fs');
const path = require('path');

const srcFile = process.argv[2];
if (!srcFile) {
    console.error("No file specified");
    process.exit(1);
}

const distFile = path.join(
    'dist',
    path.relative('src', srcFile)
);

fs.mkdirSync(path.dirname(distFile), { recursive: true });
fs.copyFileSync(srcFile, distFile);

console.log(`Updated: ${distFile}`);
