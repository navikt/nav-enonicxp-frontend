import React, { useEffect } from 'react';
import { editorFetchVersions } from '../editor-fetch-utils';

type Props = {
    contentId: string;
};

// Ensure the correct name is displayed on the top of the editor-view
// There is a bug in CS which causes it to always shows the last editor to
// modify the content, ignoring publishing/unpublishing actions
export const PublishedNameDisplayHack = ({ contentId }: Props) => {
    useEffect(() => {
        editorFetchVersions(contentId).then((res) => {
            const activeVersion = res?.activeVersion?.contentVersion;
            if (!activeVersion) {
                return;
            }

            const editorDisplayName =
                activeVersion.publishInfo?.publisherDisplayName ||
                activeVersion.modifierDisplayName;
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
