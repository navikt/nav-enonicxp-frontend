const hasScrollOptionsSupport =
    typeof document !== 'undefined' &&
    'scrollBehavior' in document.documentElement.style;

const scrollToCurrent = (position: number) => {
    window.scrollTo({
        behavior: 'smooth',
        top: position,
    });
};

const scrollToLegacy = (position: number) => {
    window.scrollTo(0, position);
};

const scrollTo = hasScrollOptionsSupport ? scrollToCurrent : scrollToLegacy;

export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY;
        scrollTo(top - offset);
        targetElement.focus({ preventScroll: true });
    }
};

export const isElementVisible = (element: Element, parent: Element) => {
    if (!element.getBoundingClientRect || !parent.getBoundingClientRect) {
        return false;
    }
    const elementRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const isVisibleHorizontally =
        elementRect.x >= parentRect.x &&
        elementRect.x + elementRect.width <= parentRect.x + parentRect.width;
    const isVisibleVertically =
        elementRect.y > parentRect.y &&
        elementRect.y + elementRect.height < parentRect.y + parentRect.height;

    return isVisibleHorizontally && isVisibleVertically;
};
