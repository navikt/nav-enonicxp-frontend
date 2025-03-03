import React, { useEffect } from 'react';
import { useIsClientSide } from './useIsClientSide';

export const useClient = () => {
    const [hasMouse, setHasMouse] = React.useState(false);
    const isClientSide = useIsClientSide();

    const detectMouse = (event: PointerEvent) => {
        if (event && event.pointerType === 'mouse') {
            setHasMouse(true);
            document.removeEventListener('pointermove', detectMouse);
        }
    };

    const hasTouch = () => {
        if (typeof window === 'undefined') return false;
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    useEffect(() => {
        if (isClientSide) {
            document.addEventListener('pointermove', detectMouse);
        }
        return () => {
            if (isClientSide) {
                document.removeEventListener('pointermove', detectMouse);
            }
        };
        /* eslint-disable-next-line  */
    }, [isClientSide]);

    return {
        hasTouch: hasTouch(),
        hasMouse: hasMouse,
    };
};
