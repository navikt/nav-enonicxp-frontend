import { useState, useEffect, useRef } from 'react';

export const useScrollPosition = (element: HTMLElement) => {
    const scrollPositionRef = useRef(0);

    const saveScrollPosition = () => {
        if (element) {
            scrollPositionRef.current = element.getBoundingClientRect().top;
            console.log(scrollPositionRef.current);
        }
    };

    const scrollBackToElement = () => {
        if (element) {
            const targetScrollPosition =
                element.getBoundingClientRect().top +
                window.scrollY -
                scrollPositionRef.current;

            const scrollOptions: ScrollToOptions = {
                top: targetScrollPosition,
                behavior: 'instant',
            };
            window.scroll(scrollOptions);
        }
    };

    return { saveScrollPosition, scrollBackToElement };
};
