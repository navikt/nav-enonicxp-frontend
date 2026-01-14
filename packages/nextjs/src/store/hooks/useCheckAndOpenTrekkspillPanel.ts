import { useEffect, useCallback, useRef } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenTrekkspillPanel = (
    openPanels: number[],
    setOpenPanels: (indexes: number[]) => void,
    refs: React.RefObject<HTMLDivElement | null>[],
    expandAll: () => void
) => {
    const hasCalledExpandAll = useRef(false);
    const openPanelsRef = useRef(openPanels);

    useEffect(() => {
        openPanelsRef.current = openPanels;
    }, [openPanels]);

    const checkAndOpenPanels = useCallback(() => {
        if (!hasCalledExpandAll.current) {
            hasCalledExpandAll.current = true;
            if (window.location.search.includes('expandall=true')) {
                expandAll();
                return;
            }
        }

        const targetId = window.location.hash.slice(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        const panelIndex = refs.findIndex((ref) => ref.current?.contains(targetElement));

        if (panelIndex !== -1 && !openPanelsRef.current.includes(panelIndex)) {
            setOpenPanels([...openPanelsRef.current, panelIndex]);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    }, [refs, setOpenPanels, expandAll]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanels);
        return () => window.removeEventListener('hashchange', checkAndOpenPanels);
    }, [checkAndOpenPanels]);

    useEffect(checkAndOpenPanels, [checkAndOpenPanels]);
};
