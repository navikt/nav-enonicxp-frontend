import { useCallback, useEffect } from 'react';

export enum Snarveier {
    SEARCH = 'SEARCH',
}

type UseSnarveierProps = {
    shortcut: Snarveier;
    callback: () => void;
};

export const useSnarveier = ({ shortcut, callback }: UseSnarveierProps) => {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (
                shortcut === Snarveier.SEARCH &&
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === 'f'
            ) {
                callback();
            }
        },
        [shortcut, callback]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};
