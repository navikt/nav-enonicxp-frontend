import path, { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-storysource'),
        getAbsolutePath('storybook-addon-pseudo-states'),
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

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}
