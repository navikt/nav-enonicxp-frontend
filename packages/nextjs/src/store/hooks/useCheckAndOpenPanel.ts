import { useEffect, useCallback } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenPanel = (
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    ref: React.RefObject<HTMLDivElement | null>,
    anchorId?: string
) => {
    const checkAndOpenPanel = useCallback(() => {
        if (isOpen) return;

        const targetId = window.location.hash.slice(1);
        if (!targetId) return;

        if (window.location.search.includes('expandall=true') || targetId === anchorId) {
            setIsOpen(true);
            return;
        }

        const targetElement = document.getElementById(targetId);
        if (ref.current?.contains(targetElement)) {
            setIsOpen(true);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    }, [isOpen, setIsOpen, ref, anchorId]);

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanel);
        return () => window.removeEventListener('hashchange', checkAndOpenPanel);
    }, [checkAndOpenPanel]);

    useEffect(checkAndOpenPanel, [checkAndOpenPanel]);
};
