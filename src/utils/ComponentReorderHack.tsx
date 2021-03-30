import { useEffect } from 'react';

export const ComponentReorderHack = () => {
    // Hack to allow layout-components to be reordered in the content studio
    // components-view (may have unintended side-effects!)
    useEffect(() => {
        const callback = (mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.target.id === 'drag-helper' &&
                    !mutation.target.classList.contains('drop-allowed')
                ) {
                    mutation.target.classList.add('drop-allowed');
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
