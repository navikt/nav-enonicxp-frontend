import { useRef } from 'react';

export const useScrollPosition = (element: HTMLElement | null) => {
    const scrollPositionRef = useRef(0);

    const saveScrollPosition = () => {
        if (element) {
            scrollPositionRef.current = element.getBoundingClientRect().top;
        }
    };

    const scrollBackToElement = () => {
        if (element) {
            const targetScrollPosition =
                element.getBoundingClientRect().top + window.scrollY - scrollPositionRef.current;

            const scrollOptions: ScrollToOptions = {
                top: targetScrollPosition,
                behavior: 'instant',
            };
            window.scroll(scrollOptions);
        }
    };

    return { saveScrollPosition, scrollBackToElement };
};
