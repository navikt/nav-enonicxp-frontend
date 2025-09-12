import cssModules from 'eslint-plugin-css-modules';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';
import nextPlugin from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    {
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'no-relative-import-paths': noRelativeImportPaths,
            import: importPlugin,
            'css-modules': cssModules,
            storybook: storybook,
            '@next/next': nextPlugin,
            react: react,
            'react-hooks': reactHooks,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            // Disable react-in-jsx-scope for Next.js (uses new JSX transform)
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off', // TypeScript handles prop validation
            '@next/next/no-img-element': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'import/order': [
                'warn',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'index', 'object', 'unknown', 'type'],
                        'sibling',
                    ],
                    pathGroups: [
                        {
                            pattern: './**/*.module.scss',
                            group: 'sibling',
                            position: 'after',
                        },
                    ],
                },
            ],
            'no-console': 'warn',
            'no-alert': 'error',
            'no-relative-import-paths/no-relative-import-paths': [
                'warn',
                {
                    allowSameFolder: true,
                    rootDir: 'src',
                },
            ],
            '@next/next/no-html-link-for-pages': 'off',
        },
        settings: {
            react: {
                version: 'detect',
                runtime: 'automatic', // Next.js uses the new JSX transform
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
            'css-modules': {
                basePath: 'src',
            },
        },
    },
    {
        ignores: ['next.config.js'],
    },
];
