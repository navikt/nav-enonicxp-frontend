import { useEffect } from 'react';
import { smoothScrollToTarget } from 'utils/scroll-to';

export const useCheckAndOpenPanel = (
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    ref: React.RefObject<HTMLDivElement>,
    anchorId?: string
) => {
    const checkAndOpenPanel = () => {
        if (isOpen) {
            return;
        }

        if (window.location.toString().includes('expandall=true')) {
            setIsOpen(true);
            return;
        }

        const targetId = window.location.hash.replace('#', '');
        if (!targetId) {
            return;
        }

        if (targetId === anchorId) {
            setIsOpen(true);
            return;
        }

        const elementWithId = document.getElementById(targetId);
        if (ref.current?.contains(elementWithId)) {
            setIsOpen(true);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    };

    const hashChangeHandler = () => {
        checkAndOpenPanel();
    };

    useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);

        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);

    useEffect(() => {
        checkAndOpenPanel();
    }, [anchorId]);
};
