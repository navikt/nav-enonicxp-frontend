const withLess = require('@zeit/next-less');
const packageJson = require('./package.json');

const navFrontendModuler = [];
Object.keys(packageJson.dependencies).forEach((key) => {
    if (key.startsWith('nav-frontend-')) {
        navFrontendModuler.push(key);
    }
});

const withTranspileModules = require('next-transpile-modules')(
    navFrontendModuler
);

module.exports = withTranspileModules(withLess({}));
