import { useCallback, useEffect, useRef } from 'react';
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

    const checkAndOpenTrekkspillPanels = useCallback(() => {
        if (!hasCalledExpandAll.current) {
            hasCalledExpandAll.current = true;
            const params = new URLSearchParams(window.location.search);

            if (params.get('expandall') === 'true') {
                expandAll();
                return;
            }
        }

        const currentOpen = openPanelsRef.current;
        const toOpen = new Set(currentOpen);

        refs.forEach((r, i) => {
            if (r.current?.querySelector('.DuplicateIdsVarsel_warning')) {
                toOpen.add(i);
            }
        });

        const targetId = window.location.hash.slice(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        const panelIndex = targetElement
            ? refs.findIndex((ref) => ref.current?.contains(targetElement))
            : -1;

        if (panelIndex !== -1) {
            toOpen.add(panelIndex);
        }

        const toOpenArray = Array.from(toOpen);
        const setsAreEqual =
            toOpenArray.length === currentOpen.length &&
            toOpenArray.every((value) => currentOpen.includes(value));

        if (!setsAreEqual) {
            setOpenPanels(toOpenArray);
            if (panelIndex !== -1 && !currentOpen.includes(panelIndex)) {
                setTimeout(() => smoothScrollToTarget(targetId), 500);
            }
        }
    }, [refs, setOpenPanels, expandAll]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenTrekkspillPanels);
        return () => window.removeEventListener('hashchange', checkAndOpenTrekkspillPanels);
    }, [checkAndOpenTrekkspillPanels]);

    useEffect(checkAndOpenTrekkspillPanels, [checkAndOpenTrekkspillPanels]);
};
