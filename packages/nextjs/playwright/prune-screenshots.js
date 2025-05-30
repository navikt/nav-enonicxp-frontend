const fs = require('fs');
const path = require('path');
const storybook = require('../storybook-static/index.json');

async function pruneScreenshots() {
    const currentStoryIds = new Set(
        Object.values(storybook.entries)
            .filter((entry) => entry.type === 'story')
            .map((story) => story.id)
    );
    const screenshotsDir = path.join(__dirname, 'screenshot.spec.ts-snapshots');

    if (!fs.existsSync(screenshotsDir)) {
        console.log('No screenshots directory found');
        return;
    }

    const files = fs.readdirSync(screenshotsDir);
    let deletedCount = 0;

    for (const file of files) {
        const storyId = file.replace(/-[^-]+-[^-]+-[^-]+-[^-]+\.png$/, '');

        if (!currentStoryIds.has(storyId)) {
            const filePath = path.join(screenshotsDir, file);
            try {
                fs.unlinkSync(filePath);
                console.log(`Deleted screenshot for deleted story: ${file}`);
                deletedCount++;
            } catch (error) {
                console.error(`Failed to delete ${file}:`, error);
            }
        }
    }

    if (deletedCount > 0) {
        console.log(`Deleted ${deletedCount} orphaned screenshots`);
    }
}

pruneScreenshots().catch(console.error);
