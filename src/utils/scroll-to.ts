const windowScrollTo = (targetElement: HTMLElement, offset: number) => {
    const top = targetElement.getBoundingClientRect().top + window.scrollY;

    targetElement.focus({ preventScroll: true });

    window.scrollTo({
        behavior: 'smooth',
        top: top - offset,
    });
};

const targetScrollIntoView = (targetElement: HTMLElement) => {
    targetElement.focus({ preventScroll: true });
    targetElement.scrollIntoView();
};

const scrollToTarget =
    typeof window !== 'undefined'
        ? !!window.scrollTo
            ? windowScrollTo
            : targetScrollIntoView
        : () => null;

export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        scrollToTarget(targetElement, offset);
    }
};
