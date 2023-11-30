import { useState, useEffect } from 'react';

// Helper hook to ensure that logic in consuming components only fire after the
// initial render on the client side
// Used for client-side-only rendering without causing hydration errors
export const useIsClientSide = (): boolean => {
    const [isClientSide, setIsClientSide] = useState(false);

    useEffect(() => {
        setIsClientSide(true);
    }, []);

    return isClientSide;
};
