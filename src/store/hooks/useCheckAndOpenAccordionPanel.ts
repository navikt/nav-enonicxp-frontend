import { useEffect } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenAccordionPanel = (
    openPanels: number[],
    setOpenPanels: (indexes: number[]) => void,
    refs: React.RefObject<HTMLDivElement>[],
    expandAll: () => void
) => {
    const checkAndOpenPanels = () => {
        const targetId = window.location.hash.replace('#', '');
        const elementWithId = document.getElementById(targetId);

        if (window.location.toString().includes('expandall=true')) {
            expandAll();
            return;
        }

        if (!targetId) return;

        for (let i = 0; i < refs.length; i++) {
            if (refs[i].current?.contains(elementWithId)) {
                setOpenPanels([...openPanels, i]);
                setTimeout(() => smoothScrollToTarget(targetId), 500);
                return;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanels);
        return () => {
            window.removeEventListener('hashchange', checkAndOpenPanels);
        };
    }, []);

    useEffect(() => {
        checkAndOpenPanels();
    }, []);
};
