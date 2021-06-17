export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const { scrollX, scrollY } = window;
        const top = targetElement.getBoundingClientRect().top + scrollY;
        targetElement.focus();
        window.scrollTo({
            behavior: 'auto',
            left: scrollX,
            top: scrollY,
        });
        window.scrollTo({
            behavior: 'smooth',
            top: top - offset,
        });
    }
};
