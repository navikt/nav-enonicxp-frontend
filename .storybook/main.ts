import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-mdx-gfm'),
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    staticDirs: ['../public'],

    docs: {},

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};
export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}