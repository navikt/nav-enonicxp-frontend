module.exports = {
    'packages/nextjs/**/*.{ts,tsx}': [
        'prettier --write',
        'npx eslint --debug --config ./packages/nextjs/.eslintrc.json',
    ],
    'packages/nextjs/**/*.{scss,css}': ['prettier --write'],
};
