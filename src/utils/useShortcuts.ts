import { useEffect } from 'react';

export enum Shortcuts {
    SEARCH = 'SEARCH',
}

type UseShortcutsProps = {
    shortcut: Shortcuts;
    callback: () => void;
};

export const useShortcuts = ({ shortcut, callback }: UseShortcutsProps) => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (
            shortcut === Shortcuts.SEARCH &&
            (e.ctrlKey || e.metaKey) &&
            e.key === 'f'
        ) {
            callback();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
};
