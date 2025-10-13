#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports, no-console */
/* global require, process, __dirname, console */

const fs = require('fs');
const path = require('path');

const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';
const pagesDir = path.join(__dirname, '../src/pages');

// Only copy for failover builds - regular builds use the default file
if (isFailover) {
  const sourceFile = path.join(pagesDir, '[...pathRouter].failover.tsx');
  const targetFile = path.join(pagesDir, '[...pathRouter].tsx');

  console.log('Preparing router for FAILOVER mode...');
  console.log(`Copying ${path.basename(sourceFile)} to ${path.basename(targetFile)}`);

  fs.copyFileSync(sourceFile, targetFile);

  console.log('✅ Router prepared for failover!');
}
