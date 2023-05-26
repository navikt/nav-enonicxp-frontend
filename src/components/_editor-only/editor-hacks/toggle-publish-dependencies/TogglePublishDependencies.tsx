import React, { useEffect } from 'react';

/*
 * Sets the default option for publishing dependencies to off/unchecked
 * */

const DIALOG_CONTAINER_CLASS = 'dialog-container';
const PUBLISH_DIALOG_ID = 'ContentPublishDialog';
const DEPENDANTS_CONTROLS_CLASS = 'dependants-controls';

const ALL_DEPENDANTS_CHECKBOX_SELECTOR = `#${PUBLISH_DIALOG_ID} .${DEPENDANTS_CONTROLS_CLASS} input[type="checkbox"]`;

const TOGGLE_FLAG = 'did-toggle-all';

const uncheckPublishAllDependants = () => {
    const dialogContainer = parent.window.document.getElementsByClassName(
        DIALOG_CONTAINER_CLASS
    )[0];

    if (!dialogContainer) {
        console.log('No dialog container found!');
        return;
    }

    const allDependantsCheckbox =
        parent.window.document.querySelector<HTMLInputElement>(
            ALL_DEPENDANTS_CHECKBOX_SELECTOR
        );

    if (!allDependantsCheckbox) {
        console.log('No dependants checkbox found!');
        return;
    }

    if (
        allDependantsCheckbox.checked &&
        !dialogContainer.classList.contains(TOGGLE_FLAG)
    ) {
        dialogContainer.classList.add(TOGGLE_FLAG);
        allDependantsCheckbox.click();
        console.log('Dependants checkbox clicked!');
    }
};

const isPublishDialogStateResolved = (element: HTMLElement) =>
    element?.id === 'DialogStateBar' && !element.classList.contains('checking');

const removeToggleFlag = (mutation: MutationRecord) => {
    mutation.addedNodes.forEach((node: HTMLElement) => {
        if (node.classList?.contains(DIALOG_CONTAINER_CLASS)) {
            // Ensure our toggle flag is removed from new dialog containers
            // Content studio caches dom-elements, so this will persist even when the dialog is closed
            node.classList.remove(TOGGLE_FLAG);
        }
    });
};

const mutationCallback: MutationCallback = (mutations) => {
    parent.window.console.log('mutationCallback was called');

    mutations.forEach((mutation) => {
        if (isPublishDialogStateResolved(mutation.target as HTMLElement)) {
            uncheckPublishAllDependants();
        }

        removeToggleFlag(mutation);
    });
};

const enablePublishDialogObserver = () => {
    console.log('Enabling togglePublishDependenciesObserver');

    // If the observer was previously defined, the callback function may have
    // gone out of scope and will no longer be active
    // The observer may still have collected records which has not been processed.
    // We process them and disconnect the old observer
    if (parent.window.togglePublishDependenciesObserver) {
        const records =
            parent.window.togglePublishDependenciesObserver.takeRecords();

        mutationCallback(
            records,
            parent.window.togglePublishDependenciesObserver
        );

        parent.window.togglePublishDependenciesObserver.disconnect();
    }

    parent.window.togglePublishDependenciesObserver = new MutationObserver(
        mutationCallback
    );

    parent.window.togglePublishDependenciesObserver.observe(
        parent.window.document.body,
        {
            childList: true,
            subtree: true,
            attributeFilter: ['class'],
        }
    );
};

export const TogglePublishDependencies = () => {
    useEffect(() => {
        // Run the uncheck function on mount, in case the frontend was not loaded
        // in the editor preview when the publish dialog first appeared
        uncheckPublishAllDependants();

        enablePublishDialogObserver();
    }, []);

    return null;
};
