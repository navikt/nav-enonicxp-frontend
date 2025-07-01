const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'playwright', 'screenshot.spec.ts-snapshots');
const destDir = path.join(__dirname, '..', 'public', 'screenshot.spec.ts-snapshots');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
    if (file.endsWith('.png')) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    }
});
