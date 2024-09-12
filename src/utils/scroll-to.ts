const hasScrollOptionsSupport =
    typeof document !== 'undefined' && 'scrollBehavior' in document.documentElement.style;

const scrollToCurrent = (position: number) => {
    window.scrollTo({
        top: position,
    });
};

const scrollToLegacy = (position: number) => {
    window.scrollTo(0, position);
};

export const windowScrollTo = hasScrollOptionsSupport ? scrollToCurrent : scrollToLegacy;

export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY;
        windowScrollTo(top - offset);
        targetElement.focus({ preventScroll: true });
    }
};

const getHeaderOffset = (): number => {
    const fallbackHeaderHeight = 80;
    const headerElement = document.getElementById('decorator-header') as HTMLElement;

    if (headerElement) {
        const computedStyleHeader = getComputedStyle(headerElement);
        const headerHeight = computedStyleHeader.getPropertyValue('--header-height');
        return parseInt(headerHeight) || fallbackHeaderHeight;
    } else {
        return fallbackHeaderHeight;
    }
};

export const handleStickyScrollOffset = (isOpening: boolean, current: HTMLDivElement | null) => {
    if (!isOpening && current) {
        const verticalPosition = current.getBoundingClientRect().top;

        if (verticalPosition < 0) {
            window.scrollBy({
                top: verticalPosition - getHeaderOffset(),
                behavior: 'instant',
            });
        }
    }
};
