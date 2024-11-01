/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    resetMocks: false,
    moduleDirectories: ['../node_modules'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/shared/(.*)': '<rootDir>/../shared/src/$1',
        'cache/(.*)': '<rootDir>/src/cache/$1',
    },
};
