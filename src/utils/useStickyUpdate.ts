import { useEffect } from 'react';
import debounce from 'lodash.debounce';

let numStickyUsers = 0;

const minUpdateRateMs = 1000 / 60;

const setDecoratorHeaderOffsetVar = debounce(
    () => {
        const decoratorHeader = document.getElementById(
            'hovedmeny'
        ) as HTMLElement;
        if (!decoratorHeader) {
            return;
        }
        const boundingRect = decoratorHeader.getBoundingClientRect();
        const offset = Math.max(boundingRect.top + boundingRect.height, 0);

        document.documentElement.style.setProperty(
            '--sticky-offset',
            `${offset}px`
        );
    },
    minUpdateRateMs / 2,
    { maxWait: minUpdateRateMs }
);

// Keeps the event listener active for updating the sticky-header offset variable,
// as long as at least one component is mounted with this hook set to active
export const useStickyUpdate = (active: boolean = true) => {
    useEffect(() => {
        if (!active) {
            return;
        }

        if (numStickyUsers >= 1) {
            numStickyUsers++;
            return;
        }

        numStickyUsers = 1;
        window.addEventListener('scroll', setDecoratorHeaderOffsetVar);

        return () => {
            if (numStickyUsers > 1) {
                numStickyUsers--;
                return;
            }

            numStickyUsers = 0;
            window.removeEventListener('scroll', setDecoratorHeaderOffsetVar);
        };
    }, [active]);
};
