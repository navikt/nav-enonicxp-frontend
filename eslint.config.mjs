import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import cssModules from 'eslint-plugin-css-modules';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            'css-modules': cssModules,
        },
        rules: {
            'css-modules/no-unused-class': [
                'warn',
                {
                    camelCase: true,
                },
            ],
            'css-modules/no-undef-class': [
                'error',
                {
                    camelCase: true,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/triple-slash-reference': 'off',
        },
    },
    {
        files: ['packages/nextjs/**/*.ts', 'packages/nextjs/**/*.tsx'],
        settings: {
            'css-modules': {
                basePath: 'packages/nextjs/src',
            },
        },
    },
];
