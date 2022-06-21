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
