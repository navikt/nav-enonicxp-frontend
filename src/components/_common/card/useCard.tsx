import { useRef } from 'react';
import { useState } from 'react';
import { Interaction } from 'types/interaction';

interface UseCardState {
    isHovering: boolean;
    isPressed: boolean;
    cardInteractionHandler: (type: Interaction) => void;
}

export const useCardState = (): UseCardState => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const cardInteractionHandler = (type: Interaction): void => {
        if (
            type === Interaction.mouseenter ||
            type === Interaction.mouseleave
        ) {
            setIsHovering(type === Interaction.mouseenter);
        }

        if (type === Interaction.mouseleave) {
            setIsPressed(false);
        }

        if (type === Interaction.mousedown || type === Interaction.mouseup) {
            setIsPressed(type === Interaction.mousedown);
        }

        if (type === Interaction.touchstart) {
            setIsPressed(true);
        }

        if (type === Interaction.touchend || type === Interaction.touchcancel) {
            setIsPressed(false);
        }
    };

    return { isHovering, isPressed, cardInteractionHandler };
};
