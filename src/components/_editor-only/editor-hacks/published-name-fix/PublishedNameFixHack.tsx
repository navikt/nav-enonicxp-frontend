import React, { useEffect } from 'react';
import { editorFetchVersions } from '../editor-fetch-utils';

type Props = {
    contentId: string;
};

export const PublishedNameFixHack = ({ contentId }: Props) => {
    useEffect(() => {
        editorFetchVersions(contentId).then((res) => {
            if (!res) {
                return;
            }

            const lastCommitedVersion = res.contentVersions?.find(
                (version) => !!version.publishInfo
            );
            if (!lastCommitedVersion) {
                return;
            }

            console.log(
                `Last committer: ${lastCommitedVersion.publishInfo.publisherDisplayName}`
            );

            const authorContainer =
                parent.window.document.getElementsByClassName(
                    'author'
                )[0] as HTMLElement;
            if (!authorContainer) {
                return;
            }

            const preposition = authorContainer.innerText.split(' ')[0];
            authorContainer.innerText = `${preposition} ${lastCommitedVersion.publishInfo.publisherDisplayName}`;
        });
    }, [contentId]);

    return null;
};
