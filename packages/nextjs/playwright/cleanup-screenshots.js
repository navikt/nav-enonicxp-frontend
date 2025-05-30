const fs = require('fs');
const path = require('path');
const storybook = require('../storybook-static/index.json');

async function cleanupScreenshots() {
    // Get all current story IDs from storybook
    const currentStoryIds = new Set(
        Object.values(storybook.entries)
            .filter((entry) => entry.type === 'story')
            .map((story) => story.id)
    );

    // Path to screenshots directory
    const snapshotsDir = path.join(__dirname, 'screenshot.spec.ts-snapshots');

    if (!fs.existsSync(snapshotsDir)) {
        console.log('No snapshots directory found');
        return;
    }

    // Get all screenshot files
    const files = fs.readdirSync(snapshotsDir);
    let removedCount = 0;

    for (const file of files) {
        // Extract story ID from filename (format: components-common-componentname--variant_platform.png)
        const storyId = file.split('_')[0];

        // If the story no longer exists, remove its screenshot
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
