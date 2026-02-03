import path from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/nextjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: ['@storybook/addon-docs', 'storybook-addon-pseudo-states'],

    framework: {
        name: '@storybook/nextjs',
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
                    '@navikt/nav-dekoratoren-moduler': path.resolve(
                        __dirname,
                        'mocks/nav-dekoratoren-moduler.js'
                    ),
                },
            },
        };

        return updatedConfig;
    },

    staticDirs: ['../public'],

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};
export default config;
