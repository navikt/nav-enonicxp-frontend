import { useEffect, useCallback, useRef } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenPanel = (
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    ref: React.RefObject<HTMLDivElement | null>,
    anchorId?: string
) => {
    const hasHandledExpandAll = useRef(false);
    const isOpenRef = useRef(isOpen);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const checkAndOpenPanel = useCallback(() => {
        if (isOpenRef.current) return;

        if (!hasHandledExpandAll.current) {
            hasHandledExpandAll.current = true;
            if (window.location.search.includes('expandall=true')) {
                setIsOpen(true);
                return;
            }
        }

        const targetId = window.location.hash.slice(1);
        if (!targetId) return;

        if (targetId === anchorId) {
            setIsOpen(true);
            return;
        }

        const targetElement = document.getElementById(targetId);
        if (ref.current?.contains(targetElement)) {
            setIsOpen(true);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    }, [anchorId, ref, setIsOpen]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanel);
        return () => window.removeEventListener('hashchange', checkAndOpenPanel);
    }, [checkAndOpenPanel]);

    useEffect(checkAndOpenPanel, [checkAndOpenPanel]);
};
