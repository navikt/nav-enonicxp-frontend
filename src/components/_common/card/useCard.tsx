import { useState } from 'react';

interface UseCardState {
    isHovering: boolean;
    setHoverState: (newHoverState: boolean) => void;
}

export const useCardState = (): UseCardState => {
    const [isHovering, setIsHovering] = useState(false);

    const setHoverState = (newHoverState: boolean): void => {
        if (newHoverState === null) {
            return;
        }
        if (isHovering !== newHoverState) {
            setIsHovering(newHoverState);
        }
    };

    return { isHovering, setHoverState };
};
