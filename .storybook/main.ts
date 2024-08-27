import path, { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-mdx-gfm'),
        getAbsolutePath('@storybook/addon-storysource'),
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    webpackFinal: async (config) => {
        const updatedConfig = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    common: path.resolve(__dirname, '../src/common.scss'),
                },
            },
        };

        return updatedConfig;
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
