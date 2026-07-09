import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export const nodeConfig = [
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
        },
    },
];

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            'no-console': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
];
