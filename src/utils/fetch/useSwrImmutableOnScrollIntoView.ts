import React, { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import debounce from 'lodash.debounce';

type Props<FetchResponse, ElementType extends HTMLElement = HTMLElement> = {
    url: string;
    fetchFunc: (url: string) => Promise<FetchResponse>;
    elementRef: React.MutableRefObject<ElementType>;
};

// Start fetching when the element is less than half a viewport away from being visible
const VIEWPORT_PREFETCH_MARGIN = 0.5;

const isNearOrAboveViewport = (element?: HTMLElement) => {
    return (
        element?.getBoundingClientRect().y - window.innerHeight <
        window.innerHeight * VIEWPORT_PREFETCH_MARGIN
    );
};

export const useSwrImmutableOnScrollIntoView = <FetchResponse>({
    url,
    fetchFunc,
    elementRef,
}: Props<FetchResponse>) => {
    const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
    const result = useSWRImmutable(isScrolledIntoView ? url : null, fetchFunc);

    useEffect(() => {
        if (!url) {
            return;
        }

        const updateElementScrollStatus = debounce(
            () => {
                if (!isNearOrAboveViewport(elementRef.current)) {
                    return false;
                }

                setIsScrolledIntoView(true);
                window.removeEventListener('scroll', updateElementScrollStatus);
                return true;
            },
            15,
            { maxWait: 30 }
        );

        if (updateElementScrollStatus()) {
            return;
        }

        window.addEventListener('scroll', updateElementScrollStatus);
        return () => {
            window.removeEventListener('scroll', updateElementScrollStatus);
        };
    }, [elementRef, url]);

    return result;
};
