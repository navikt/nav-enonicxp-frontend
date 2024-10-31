export default {
    'packages/nextjs/**/.tsx': [
        'tsc packages/nextjs/src/**/*.tsx',
        'npx eslint --config packages/nextjs/.eslintrc.js',
    ],
};
