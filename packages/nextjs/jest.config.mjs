import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', 'src'],
    modulePathIgnorePatterns: ['spec.ts'],
    moduleNameMapper: {
        // Next 16's next/jest no longer maps tsconfig `paths`, and its SWC transform
        // mis-resolves the cross-package `@/shared/*` alias (baseUrl: src). It emits
        // `../../shared/src/*` relative to the package dir instead of baseUrl. Redirect
        // those rewritten specifiers to the real location.
        '^(?:\\.\\./)+shared/src/(.*)$': '<rootDir>/../shared/src/$1',
    },
};

export default createJestConfig(config);
