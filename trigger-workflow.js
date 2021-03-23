const { readFileSync } = require('fs');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/core');

const token = readFileSync('.github-token', 'utf8').trim();
const owner = 'navikt';
const repo = 'nav-enonicxp-frontend';

const octokit = new Octokit({
    auth: token,
});

module.exports.triggerWorkflow = (workflow_id, branch) => {
    if (!workflow_id) {
        console.log('Aborting: no workflow was specified');
        return;
    }

    const ref =
        branch || execSync('git branch --show-current').toString().trim();

    if (!ref) {
        console.log('Aborting: could not determine branch');
        return;
    }

    console.log(
        `Starting workflow ${workflow_id} on remote branch ${ref} (did you remember to push your branch?)`
    );

    octokit
        .request(
            'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
            {
                owner,
                repo,
                workflow_id,
                ref,
            }
        )
        .then(() => console.log('Workflow started'))
        .catch((e) => {
            console.error(`Failed to start workflow - ${e}`);
        });
};
