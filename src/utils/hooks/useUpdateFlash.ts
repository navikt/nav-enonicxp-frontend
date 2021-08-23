import { useEffect, useRef } from 'react';

import './useUpdateFlash.less';

/**  Will flash the page (without Dekoratøren) white, indicating that content changed.
 * Mainly used by filters to indicate a change, but can also be used to indicate other significant
 * content changes.
 */

export const useUpdateFlash = () => {
    let cover = useRef<HTMLElement>(null);

    useEffect(() => {
        cover.current = document.getElementById('contentUpdateCover');
        if (!cover.current) {
            const coverElement = document.createElement('div');
            coverElement.classList.add('filterCover');
            coverElement.id = 'contentUpdateCover';
            document.body.appendChild(coverElement);
            cover.current = coverElement;
        }
    }, []);

    const startContentChange = () => {
        cover.current?.classList.add('visible');

        setTimeout(() => {
            cover.current?.classList.remove('visible');
        }, 300);
    };

    return { startContentChange };
};
