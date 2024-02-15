/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    resetMocks: false,
    moduleDirectories: ['../node_modules'],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": {
        "srcCommon/(.*)": "<rootDir>/../srcCommon/$1"
    },
};
