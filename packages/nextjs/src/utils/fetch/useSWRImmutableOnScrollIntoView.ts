import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

type Props<FetchResponse> = {
    url: string | null;
    fetchFunc: (url: string) => Promise<FetchResponse>;
    elementId: string;
};

// Ensures fetch is performed immediately if the element is within one viewport height
// of the current viewport
const isNearOrAboveViewport = (elementId: string) => {
    if (typeof window === 'undefined') {
        return false;
    }

    const element = document.getElementById(elementId);
    if (!element) {
        return false;
    }

    // If the browser does not support IntersectionObserver, ensure we always perform the fetch on load
    if (typeof IntersectionObserver === 'undefined') {
        return true;
    }

    return element.getBoundingClientRect().y < window.innerHeight * 2;
};

export const useSWRImmutableOnScrollIntoView = <FetchResponse>({
    url,
    fetchFunc,
    elementId,
}: Props<FetchResponse>) => {
    const [isScrolledIntoView, setIsScrolledIntoView] = useState(isNearOrAboveViewport(elementId));

    const result = useSWRImmutable(isScrolledIntoView ? url : null, fetchFunc);

    useEffect(() => {
        if (isScrolledIntoView || !url) {
            return;
        }

        const element = document.getElementById(elementId);
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setIsScrolledIntoView(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: '100% 0%',
                threshold: 0,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementId, url, isScrolledIntoView]);

    return result;
};
