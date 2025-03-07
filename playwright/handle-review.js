const { github, context, core } = require('@actions/github');

async function handleReview() {
    try {
        const { repo, owner } = context.repo;

        // Get PR number from event context
        let prNumber;
        if (context.payload.pull_request) {
            prNumber = context.payload.pull_request.number;
        } else {
            console.log('No PR number found in context');
            return;
        }

        console.log('PR number:', prNumber);

        // Add a small delay to ensure files are available
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const changedFiles = await github.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber,
        });

        console.log('Total files in PR:', changedFiles.data.length);
        console.log(
            'All files in PR:',
            changedFiles.data.map((f) => `${f.filename} (${f.status})`)
        );

        // Separate files by status
        const modifiedOrAddedPngs = changedFiles.data.filter(
            (file) =>
                file.filename.endsWith('.png') &&
                (file.status === 'modified' || file.status === 'added')
        );

        const removedPngs = changedFiles.data.filter(
            (file) => file.filename.endsWith('.png') && file.status === 'removed'
        );

        console.log(
            'Modified/Added PNG files:',
            modifiedOrAddedPngs.map((f) => `${f.filename} (${f.status})`)
        );
        console.log(
            'Removed PNG files:',
            removedPngs.map((f) => `${f.filename} (${f.status})`)
        );

        if (changedFiles.data.length === 0) {
            console.log('Warning: No files detected in PR. This might be a timing issue.');
            return;
        }

        // Only consider files as "changed" if they are modified or added
        const hasScreenshotChanges = modifiedOrAddedPngs.length > 0;
        console.log('Has active screenshot changes:', hasScreenshotChanges);

        const reviews = await github.rest.pulls.listReviews({
            owner,
            repo,
            pull_number: prNumber,
        });

        const REVIEW_MARKER = '<!-- playwright-screenshot-bot -->';

        const botReview = reviews.data.find(
            (review) =>
                review.user.login === 'github-actions[bot]' &&
                review.state === 'CHANGES_REQUESTED' &&
                review.body.includes(REVIEW_MARKER)
        );

        console.log('Found screenshot bot review:', botReview ? 'yes' : 'no');

        if (hasScreenshotChanges && !botReview) {
            console.log('Creating new review');
            const filesUrl = `https://github.com/${owner}/${repo}/pull/${prNumber}/files?file-filters[]=.png&file-filters[]=^playwright/`;
            await github.rest.pulls.createReview({
                owner,
                repo,
                pull_number: prNumber,
                body: `${REVIEW_MARKER}\n## 👀 Visual changes detected\n\nPlease [review the screenshot changes](${filesUrl}) before merging.`,
                event: 'REQUEST_CHANGES',
            });
        } else if (!hasScreenshotChanges && botReview) {
            console.log('Dismissing review because no PNG changes found');
            await github.rest.pulls.dismissReview({
                owner,
                repo,
                pull_number: prNumber,
                review_id: botReview.id,
                message: `${REVIEW_MARKER}\nVisual changes have been reverted`,
            });
        } else {
            console.log(
                'No action needed:',
                hasScreenshotChanges ? 'Has changes' : 'No changes',
                botReview ? 'Has review' : 'No review'
            );
        }
    } catch (error) {
        console.log('Error:', error);
        console.log('Error details:', error.message);
        core.setFailed('Failed to handle review');
    }
}

module.exports = handleReview;
