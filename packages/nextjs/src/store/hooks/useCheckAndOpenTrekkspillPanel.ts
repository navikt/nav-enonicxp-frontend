import { useEffect, useCallback } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenTrekkspillPanel = (
    openPanels: number[],
    setOpenPanels: (indexes: number[]) => void,
    refs: React.RefObject<HTMLDivElement | null>[],
    expandAll: () => void
) => {
    const checkAndOpenPanels = useCallback(() => {
        const toOpen = new Set(openPanels);
        const targetId = window.location.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        const panelIndex = refs.findIndex((ref) => ref.current?.contains(targetElement));

        if (!targetId) return;

        if (window.location.search.includes('expandall=true')) {
            expandAll();
            return;
        }

        if (toOpen.size !== openPanels.length) {
            setOpenPanels([...toOpen]);
        }

        if (targetId) {
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }

        if (panelIndex !== -1 && !openPanels.includes(panelIndex)) {
            setOpenPanels([...openPanels, panelIndex]);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }

        if (targetId) {
            const el = document.getElementById(targetId);
            const idx = refs.findIndex((r) => r.current?.contains(el));
            if (idx !== -1) toOpen.add(idx);
        }

        refs.forEach((r, i) => {
            if (r.current?.querySelector('.DuplicateIdsVarsel_warning')) {
                toOpen.add(i);
            }
        });
    }, [openPanels, refs, setOpenPanels, expandAll]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanels);
        return () => window.removeEventListener('hashchange', checkAndOpenPanels);
    }, [checkAndOpenPanels]);

    useEffect(checkAndOpenPanels, [checkAndOpenPanels]);
};
