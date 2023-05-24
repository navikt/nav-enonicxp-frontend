import React, { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import debounce from 'lodash.debounce';

type Props<FetchResponse, ElementType extends HTMLElement = HTMLElement> = {
    url: string | null;
    fetchFunc: (url: string) => Promise<FetchResponse>;
    elementRef: React.MutableRefObject<ElementType>;
};

// Start fetching when the element is less than half a viewport away from being visible
const VIEWPORT_PREFETCH_DISTANCE = 0.5;

const isNearOrAboveViewport = (element?: HTMLElement) => {
    if (!element) {
        return false;
    }

    return (
        element.getBoundingClientRect().y - window.innerHeight <
        window.innerHeight * VIEWPORT_PREFETCH_DISTANCE
    );
};

export const useSWRImmutableOnScrollIntoView = <FetchResponse>({
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
