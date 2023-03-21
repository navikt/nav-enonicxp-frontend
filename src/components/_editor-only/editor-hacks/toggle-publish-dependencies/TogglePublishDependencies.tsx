import React, { useEffect } from 'react';

const DIALOG_CONTAINER_CLASS = 'dialog-container';
const PUBLISH_DIALOG_ID = 'ContentPublishDialog';
const DEPENDANTS_CONTROLS_CLASS = 'dependants-controls';

const DID_TOGGLE_FLAG = 'did-toggle';
const ALL_DEPENDANTS_CHECKBOX_SELECTOR = `#${PUBLISH_DIALOG_ID} .${DEPENDANTS_CONTROLS_CLASS} input[type="checkbox"]`;

const uncheckPublishAll = () => {
    const dialogContainer = parent.window.document.querySelector(
        `.${DIALOG_CONTAINER_CLASS}`
    );

    const allDependantsCheckbox = parent.window.document.querySelector(
        ALL_DEPENDANTS_CHECKBOX_SELECTOR
    ) as HTMLInputElement | null;

    if (!allDependantsCheckbox) {
        console.log('No dependants checkbox found!');
        return;
    }

    if (
        allDependantsCheckbox.checked &&
        !dialogContainer.classList.contains(DID_TOGGLE_FLAG)
    ) {
        dialogContainer.classList.add(DID_TOGGLE_FLAG);
        allDependantsCheckbox.click();
        console.log('Dependants checkbox clicked!');
    }
};

export const TogglePublishDependencies = () => {
    useEffect(() => {
        const callback = (mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.target?.id === 'DialogStateBar' &&
                    !mutation.target.classList.contains('checking')
                ) {
                    console.log(mutation);
                    uncheckPublishAll();
                }
                mutation.addedNodes.forEach((node) => {
                    if (node.classList?.contains(DIALOG_CONTAINER_CLASS)) {
                        // We set this classname as a flag and use it to ensure we only toggle off the publishing
                        // dependants once for every new dialog
                        node.classList.remove(DID_TOGGLE_FLAG);
                    }
                });
            });
        };

        const observer = new MutationObserver(callback);
        observer.observe(parent.window.document.body, {
            childList: true,
            subtree: true,
            attributeFilter: ['class'],
        });

        console.log('Added observer');

        return () => observer.disconnect();
    }, []);

    return null;
};
