import { defineConfig, devices } from '@playwright/test';

const port = 4243;

export default defineConfig({
    testDir: './packages/nextjs/playwright',
    reporter: 'html',
    workers: 13,
    fullyParallel: true,
    use: {
        baseURL: `http://localhost:${port}`,
    },
    projects: [
        {
            name: 'mobile',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: `npx http-server ./packages/nextjs/storybook-static -p ${port}`,
        port,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
});
