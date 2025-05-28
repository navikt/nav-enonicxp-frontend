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

        // Extract story ID from the test name in the snapshot path
        // Playwright creates paths like: "story-title-story-name-should-not-have-visual-regressions-1.png"
        const testName = file.replace('.png', '');
        const storyTitle = testName.split('-should-not-have-visual-regressions')[0];

        // Find the story that matches this title
        const story = stories.find((s) => `${s.title} ${s.name}` === storyTitle);

        if (!story) {
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
