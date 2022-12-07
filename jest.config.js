/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    resetMocks: false,
    moduleDirectories: ['node_modules', 'src'],
};
