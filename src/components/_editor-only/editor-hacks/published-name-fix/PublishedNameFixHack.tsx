import React, { useEffect } from 'react';
import { editorFetchVersions } from '../editor-fetch-utils';

type Props = {
    contentId: string;
};

// Ensure the correct name is displayed on the top of the editor-view
// There is a bug in CS which shows the last editor to modify the content
// only, which ignores publishing/unpublishing actions
export const PublishedNameFixHack = ({ contentId }: Props) => {
    useEffect(() => {
        editorFetchVersions(contentId).then((res) => {
            if (!res) {
                return;
            }

            const editorDisplayName =
                res.activeVersion?.contentVersion?.publishInfo
                    ?.publisherDisplayName ||
                res.activeVersion.contentVersion.modifierDisplayName;
            if (!editorDisplayName) {
                return;
            }

            const authorContainer =
                parent.window.document.getElementsByClassName(
                    'author'
                )[0] as HTMLElement;
            if (!authorContainer) {
                return;
            }

            const preposition = authorContainer.innerText.split(' ')[0];
            authorContainer.innerText = `${preposition} ${editorDisplayName}`;
        });
    }, [contentId]);

    return null;
};
