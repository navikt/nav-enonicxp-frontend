export const smoothScrollToTarget = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const { scrollX, scrollY } = window;
        const top = targetElement.getBoundingClientRect().top + scrollY;

        // Ensure the target element gets focus...
        targetElement.focus();

        // ...but immediately scroll back to the current position
        // so we can specify our own scroll behavior and position
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
