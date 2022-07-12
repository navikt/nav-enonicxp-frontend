import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CardSize, CardType } from 'types/card';
import { Interaction } from 'types/interaction';
import { LinkProps } from 'types/link-props';
import { analyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { stripXpPathPrefix } from 'utils/urls';

type AnalyticsProps = {
    analyticsLinkGroup: string;
    analyticsLabel: string;
    analyticsComponent: string;
};

type HandleUserEvent = (e: React.MouseEvent | React.TouchEvent) => void;

type UserEventProps = {
    onMouseEnter: HandleUserEvent;
    onMouseLeave: HandleUserEvent;
    onMouseDown: HandleUserEvent;
    onMouseUp: HandleUserEvent;
    onTouchStart: HandleUserEvent;
    onTouchEnd: HandleUserEvent;
    onTouchCancel: HandleUserEvent;
    onTouchMove: HandleUserEvent;
};

type UseCardState = {
    isHovering: boolean;
    isPressed: boolean;
    analyticsProps: AnalyticsProps;
    userEventProps: UserEventProps;
};

type UseCardSettings = {
    type: CardType;
    size: CardSize;
    link: LinkProps;
};

export const useCard = ({
    link,
    size,
    type,
}: UseCardSettings): UseCardState => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();

    const { layoutConfig } = useLayoutConfig();

    const getComponentAnalyticsName = (type: CardType, size: CardSize) => {
        switch (type) {
            case CardType.Provider:
                return 'Tilbyderkort';
            default:
                switch (size) {
                    case CardSize.Mini:
                        return 'Kort mini';
                    case CardSize.Micro:
                        return 'Kort mikro';
                    default:
                        return 'Kort';
                }
        }
    };

    const analyticsPayload = {
        komponent: getComponentAnalyticsName(type, size),
        lenkegruppe: layoutConfig.title,
        seksjon: layoutConfig.title,
        destinasjon: link.url,
        lenketekst: link.text,
    };

    const handleUserEvent = (e: React.MouseEvent | React.TouchEvent): void => {
        const eventType = e.type.toString() as keyof typeof Interaction;
        const type: Interaction = Interaction[eventType];

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
        if (type === Interaction.touch || type === Interaction.click) {
            const target = stripXpPathPrefix(link.url);
            router.push(target);
            logAmplitudeEvent(analyticsEvents.NAVIGATION, analyticsPayload);
        }
    };

    const buildAnalyticsProps = () => {
        return {
            analyticsLinkGroup: analyticsPayload.lenkegruppe,
            analyticsLabel: analyticsPayload.lenketekst,
            analyticsComponent: analyticsPayload.komponent,
        };
    };

    const buildUserEventProps = () => {
        return {
            onMouseEnter: handleUserEvent,
            onMouseLeave: handleUserEvent,
            onMouseDown: handleUserEvent,
            onMouseUp: handleUserEvent,
            onClick: handleUserEvent,
            onTouch: handleUserEvent,
            onTouchStart: handleUserEvent,
            onTouchEnd: handleUserEvent,
            onTouchCancel: handleUserEvent,
            onTouchMove: handleUserEvent,
        };
    };

    return {
        isHovering,
        isPressed,
        analyticsProps: buildAnalyticsProps(),
        userEventProps: buildUserEventProps(),
    };
};
