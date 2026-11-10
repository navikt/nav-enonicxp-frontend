const { execFileSync } = require('node:child_process');
const { cpSync, mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');

const temporaryDirectory = mkdtempSync(path.join(tmpdir(), 'frontend-production-config-'));
const deployment = path.join(temporaryDirectory, 'nextjs');

try {
    execFileSync(
        'pnpm',
        ['--filter', './packages/nextjs', 'deploy', '--prod', deployment, '--legacy'],
        { stdio: 'inherit' }
    );
    cpSync(path.join(__dirname, '.next/server'), path.join(deployment, '.next/server'), {
        recursive: true,
    });
    execFileSync(
        process.execPath,
        [
            '-e',
            `
                const assert = require('node:assert/strict');
                assert.throws(
                    () => require.resolve('@next/bundle-analyzer'),
                    { code: 'MODULE_NOT_FOUND' }
                );
                const config = require('./next.config.js');
                assert.equal(typeof config.headers, 'function');
                assert.equal(typeof config.webpack, 'function');
                const document = require('./.next/server/pages/_document.js');
                assert.equal(typeof document.default, 'function');
            `,
        ],
        {
            cwd: deployment,
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'production',
                ANALYZE_BUNDLE: 'false',
                IS_FAILOVER_INSTANCE: 'false',
                APP_ORIGIN: 'https://example.test',
                ADMIN_ORIGIN: 'https://admin.example.test',
                XP_ORIGIN: 'https://xp.example.test',
                FAILOVER_ORIGIN: 'https://failover.example.test',
            },
        }
    );
} finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
}
