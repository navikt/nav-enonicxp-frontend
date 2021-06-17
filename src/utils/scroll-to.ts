export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY;
        targetElement.focus();
        window.scrollTo({
            behavior: 'auto',
            left: window.scrollX,
            top: window.scrollY,
        });
        window.scrollTo({
            behavior: 'smooth',
            top: top - offset,
        });
    }
};
