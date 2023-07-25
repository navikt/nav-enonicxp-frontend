import React from 'react';
import { useClientSide } from './useIsClientSide';

export const useClient = () => {
    const [hasMouse, setHasMouse] = React.useState(false);
    const hasTouch = () => {
        if (typeof window === 'undefined') return false;
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const isClientSide = useClientSide();

    if (!isClientSide) return { hasTouch: false, hasMouse: false };

    const detectMouse = (event: PointerEvent) => {
        if (event && event.pointerType === 'mouse') {
            setHasMouse(true);
            document.removeEventListener('pointermove', detectMouse);
        }
    };

    document.addEventListener('pointermove', detectMouse);

    return {
        hasTouch: hasTouch(),
        hasMouse: hasMouse,
    };
};
