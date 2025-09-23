import { useEffect, useState } from 'react';

export const useIsDesktop = (): boolean => {
    const desktopBreakPoint = 1024; //Hold i sync med common.mq-screen-desktop
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const update = () => setIsDesktop(window.innerWidth >= desktopBreakPoint);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return isDesktop;
};
