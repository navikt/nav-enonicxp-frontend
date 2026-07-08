import baseConfig, { nodeConfig } from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    ...nodeConfig,
    {
        ignores: ['node_modules/'],
    },
];
