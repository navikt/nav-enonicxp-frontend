import { useEffect } from 'react';

export const ComponentReorderHack = () => {
    // Hack to allow layout-components to be reordered in the content studio
    // components-view (may have unintended side-effects!)
    useEffect(() => {
        const callback = (mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (
                    mutation.target.id === 'drag-helper' &&
                    !mutation.target.className.includes('drop-allowed')
                ) {
                    mutation.target.className = `${mutation.target.className} drop-allowed`;
                }
            });
        };

        const observer = new MutationObserver(callback);
        const config = {
            attributes: true,
            subtree: true,
            attributeFilter: ['class'],
        };
        observer.observe(window.parent.document, config);

        return () => observer.disconnect();
    }, []);

    return null;
};
