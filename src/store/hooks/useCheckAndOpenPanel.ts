import { useEffect } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenPanel = (
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    ref: React.RefObject<HTMLDivElement>,
    anchorId?: string
) => {
    const checkAndOpenPanel = () => {
        const targetId = window.location.hash.replace('#', '');
        const elementWithId = document.getElementById(targetId);

        if (isOpen) {
            return;
        }

        if (window.location.toString().includes('expandall=true')) {
            setIsOpen(true);
            return;
        }

        if (!targetId) {
            return;
        }

        if (targetId === anchorId) {
            setIsOpen(true);
            return;
        }

        if (ref.current?.contains(elementWithId)) {
            setIsOpen(true);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    };

    useEffect(() => {
        window.addEventListener('hashchange', checkAndOpenPanel);

        return () => {
            window.removeEventListener('hashchange', checkAndOpenPanel);
        };
    }, []);

    useEffect(() => {
        checkAndOpenPanel();
    }, [anchorId]);
};
