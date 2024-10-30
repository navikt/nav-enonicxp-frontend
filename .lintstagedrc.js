module.exports = {
    'packages/nextjs/**/*.{ts,tsx}': ['prettier --write', 'npx eslint package/nextjs'],
    'packages/nextjs/**/*.{scss,css}': ['prettier --write'],
};
