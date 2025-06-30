// scripts/move-screenshots.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'playwright', 'screenshot.spec.ts-snapshots');
const destDir = path.join(__dirname, '..', 'public', 'screenshot.spec.ts-snapshots');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
    if (file.endsWith('.png')) {
        fs.renameSync(path.join(srcDir, file), path.join(destDir, file));
    }
});

// Remove the source directory if it's empty
if (fs.existsSync(srcDir) && fs.readdirSync(srcDir).length === 0) {
    fs.rmdirSync(srcDir);
}
