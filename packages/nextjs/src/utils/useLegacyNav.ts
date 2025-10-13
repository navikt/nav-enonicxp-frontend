import { useEffect, useState } from 'react';

/**
 * Returns true when URL contains nav=legacy, otherwise false.
 * Defaults to false during SSR to avoid hydration mismatches.
 */
export const useLegacyNav = (): boolean => {
    const [isLegacy, setIsLegacy] = useState(false);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const nav = (params.get('nav') || '').toLowerCase();
            setIsLegacy(nav === 'legacy' || nav === 'old' || nav === '1');
        } catch (_) {
            // Ignore parsing errors, stick to default (false)
        }
    }, []);

    return isLegacy;
};
