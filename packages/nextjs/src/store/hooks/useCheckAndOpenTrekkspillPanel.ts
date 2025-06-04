import { useEffect, useCallback } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenTrekkspillPanel = (
    openPanels: number[],
    setOpenPanels: (indexes: number[]) => void,
    refs: React.RefObject<HTMLDivElement>[],
    expandAll: () => void
) => {
    const checkAndOpenPanels = useCallback(() => {
        const targetId = window.location.hash.slice(1);
        if (!targetId) return;

        if (window.location.search.includes('expandall=true')) {
            expandAll();
            return;
        }

        const targetElement = document.getElementById(targetId);
        const panelIndex = refs.findIndex((ref) => ref.current?.contains(targetElement));

        if (panelIndex !== -1 && !openPanels.includes(panelIndex)) {
            setOpenPanels([...openPanels, panelIndex]);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    }, [openPanels, refs, setOpenPanels, expandAll]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanels);
        return () => window.removeEventListener('hashchange', checkAndOpenPanels);
    }, [checkAndOpenPanels]);

    useEffect(checkAndOpenPanels, [checkAndOpenPanels]);
};
