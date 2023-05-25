const hasScrollOptionsSupport =
    typeof document !== 'undefined' &&
    'scrollBehavior' in document.documentElement.style;

const scrollToCurrent = (position: number) => {
    window.scrollTo({
        top: position,
    });
};

const scrollToLegacy = (position: number) => {
    window.scrollTo(0, position);
};

export const windowScrollTo = hasScrollOptionsSupport
    ? scrollToCurrent
    : scrollToLegacy;

export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY;
        windowScrollTo(top - offset);
        targetElement.focus({ preventScroll: true });
    }
};
