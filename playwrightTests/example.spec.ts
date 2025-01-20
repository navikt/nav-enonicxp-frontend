// import { test, expect } from '@playwright/test';

// // test('has title', async ({ page }) => {
// //     await page.goto('https://playwright.dev/');

// //     // Expect a title "to contain" a substring.
// //     await expect(page).toHaveTitle(/Playwright/);
// // });

// // test('get started link', async ({ page }) => {
// //     await page.goto('https://playwright.dev/');

// //     // Click the get started link.
// //     await page.getByRole('link', { name: 'Get started' }).click();

// //     // Expects page to have a heading with the name of Installation.
// //     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// // });

// test(`lskfenleskfn should not have visual regressions`, async ({ page }, workerInfo) => {
//     // const params = new URLSearchParams({
//     //     id: story.id,
//     //     viewMode: 'story',
//     // });

//     await page.goto(
//         `http://localhost:6006/iframe.html?globals=&id=components-common-areacard--work&viewMode=story`
//     );
//     await page.waitForSelector('#storybook-root');
//     // await page.waitForLoadState('networkidle');

//     await expect(page).toHaveScreenshot(`jhbdjhb.png`, {
//         fullPage: true,
//         animations: 'disabled',
//     });
// });

// test/visual.spec.ts
import { expect, test } from '@playwright/test';

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

        await expect(page).toHaveScreenshot(
            `${story.id}-${workerInfo.project.name}-${process.platform}.png`,
            {
                fullPage: true,
                animations: 'disabled',
            }
        );
    });
}
