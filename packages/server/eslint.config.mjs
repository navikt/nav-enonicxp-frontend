import globals from 'globals';
import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
            ecmaVersion: 12,
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        ignores: ['node_modules/', 'nodeenv.d.ts'],
    },
];
