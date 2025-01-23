// test/visual.spec.ts
import { expect, test } from '@playwright/test';
import path from 'path';

// This file is created by Storybook
// when we run `npm run build`
import storybook from '../storybook-static/index.json' with { type: 'json' };

// Only run tests on stories, not other documentation pages.
const stories = Object.values(storybook.entries).filter((e) => e.type === 'story');

for (const story of stories) {
    test(`${story.title} ${story.name} should not have visual regressions`, async ({
        page,
    }, workerInfo) => {
        const params = new URLSearchParams({
            id: story.id,
            viewMode: 'story',
        });

        await page.goto(`/iframe.html?${params.toString()}`);
        await page.waitForSelector('#storybook-root');
        // await page.waitForLoadState('networkidle'); TODO sjekk senere :)

        await expect(page.locator('#storybook-root')).toHaveScreenshot(
            `${story.id}-${workerInfo.project.name}-${process.platform}.png`,
            {
                // fullPage: true,
                animations: 'disabled',
                stylePath: path.join(__dirname, 'screenshot.css'),
            }
        );
    });
}

// TODO:   Slow test file: [desktop] › example.spec.ts (1.1m)
// Consider splitting slow test files to speed up parallel execution
// 138 passed (1.2m)
