const fs = require('fs');
const path = require('path');
const storybook = require('../storybook-static/index.json');

async function cleanupScreenshots() {
    const stories = Object.values(storybook.entries).filter((e) => e.type === 'story');
    const currentStoryIds = new Set(stories.map((story) => story.id));

    const snapshotsDir = path.join(__dirname, 'screenshot.spec.ts-snapshots');
    if (!fs.existsSync(snapshotsDir)) {
        console.log('No snapshots directory found');
        return;
    }

    const files = fs.readdirSync(snapshotsDir);
    let removedCount = 0;

    for (const file of files) {
        if (!file.endsWith('.png')) continue;

        // Extract story ID from filename (format: storyId-projectName-platform.png)
        const storyId = file.split('-')[0];
        if (!currentStoryIds.has(storyId)) {
            const filePath = path.join(snapshotsDir, file);
            try {
                fs.unlinkSync(filePath);
                console.log(`Removed screenshot for deleted story: ${file}`);
                removedCount++;
            } catch (error) {
                console.error(`Failed to remove ${file}:`, error);
            }
        }
    }

    console.log(`Cleanup complete. Removed ${removedCount} orphaned screenshots.`);
}

cleanupScreenshots().catch(console.error);
