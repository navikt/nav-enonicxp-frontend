import { useEffect } from 'react';

export enum Shortcuts {
    SEARCH = 'SEARCH',
}

type UseShortcutsProps = {
    shortcut: Shortcuts;
    callback: () => void;
};

export const useShortcuts = ({ shortcut, callback }: UseShortcutsProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                shortcut === Shortcuts.SEARCH &&
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === 'f'
            ) {
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
};
