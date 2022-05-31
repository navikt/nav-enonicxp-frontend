import React, { useEffect } from 'react';

const customSelectorLinkClassName = 'custom-selector-link';

// Inserts the target=_blank attribute on link-icons from custom-selector hits.
// This attribute is removed by content studio before the icon is rendered, but
// we want to sneak it back in :)
export const CustomSelectorLinkTargetHack = () => {
    useEffect(() => {
        const selectorLinks = parent.window.document.getElementsByClassName(
            customSelectorLinkClassName
        ) as HTMLCollectionOf<HTMLAnchorElement>;

        for (let element of selectorLinks) {
            element.target = '_blank';
        }

        const callback = (mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList?.contains(customSelectorLinkClassName)) {
                        node.target = '_blank';
                    }
                });
            });
        };

        const observer = new MutationObserver(callback);
        observer.observe(parent.window.document, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return null;
};
