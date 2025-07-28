import { useEffect } from 'react';

const customSelectorLinkClassName = 'custom-selector-link';

const setTargetBlank = (element: HTMLAnchorElement) => {
    element.target = '_blank';
};

const handleAddedNode = (node: Node) => {
    const element = node as Element;
    if (element.classList?.contains(customSelectorLinkClassName)) {
        setTargetBlank(element as HTMLAnchorElement);
    }
};

const handleMutation = (mutation: MutationRecord) => {
    mutation.addedNodes.forEach(handleAddedNode);
};

// Inserts the target=_blank attribute on link-icons from custom-selector hits.
// This attribute is removed by content studio before the icon is rendered, but
// we want to sneak it back in :)
export const CustomSelectorLinkTargetHack = () => {
    useEffect(() => {
        const selectorLinks = parent.window.document.getElementsByClassName(
            customSelectorLinkClassName
        ) as HTMLCollectionOf<HTMLAnchorElement>;

        for (const element of selectorLinks) {
            setTargetBlank(element);
        }

        const callback: MutationCallback = (mutations) => {
            mutations.forEach(handleMutation);
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
