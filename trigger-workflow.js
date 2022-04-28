const { readFileSync } = require('fs');
const { execSync } = require('child_process');
const { Octokit } = require('@octokit/core');

const token = readFileSync(`${__dirname}/.github-token`, 'utf8').trim();
const owner = 'navikt';
const repo = 'nav-enonicxp-frontend';

const octokit = new Octokit({
    auth: token,
});

module.exports.triggerWorkflow = (workflow_id, branchOrTag, inputs) => {
    if (!workflow_id) {
        console.log('Aborting: no workflow was specified');
        return;
    }

    const ref =
        branchOrTag || execSync('git branch --show-current').toString().trim();

    if (!ref) {
        console.log(
            'Aborting: could not determine current branch, and no branch or tag was specified'
        );
        return;
    }

    console.log(
        `Starting workflow ${workflow_id} on remote branch ${ref} (Friendly reminder: did you remember to push your branch?)`
    );

    octokit
        .request(
            'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
            {
                owner,
                repo,
                workflow_id,
                ref,
                ...(inputs && { inputs: JSON.parse(inputs) }),
            }
        )
        .then(() => console.log('Workflow started'))
        .catch((e) => {
            console.error(`Failed to start workflow - ${e}`);
        });
};
