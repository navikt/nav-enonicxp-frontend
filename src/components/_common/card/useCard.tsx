import React from 'react';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { useState } from 'react';
import { useRouter } from 'next/compat/router';
import { CardSize, CardType } from 'types/card';
import { Interaction } from 'types/interaction';
import { LinkProps } from 'types/link-props';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { usePublicUrl } from 'utils/usePublicUrl';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { hasTouch } from 'utils/navigator';

type AnalyticsProps = {
    analyticsLinkGroup?: string;
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
    userEventProps: UserEventProps | null;
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
    const { pageConfig } = usePageConfig();

    const { layoutConfig } = useLayoutConfig();

    const { url, canRouteClientSide } = usePublicUrl(link.url);

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
        const type = Interaction[eventType];

        e.stopPropagation();

        if (
            type === Interaction.mouseenter ||
            type === Interaction.mouseleave
        ) {
            setIsHovering(type === Interaction.mouseenter && !hasTouch());
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
            // User should be able to select text for text-to-speech, so abort all
            // routing if clicking is captured while text is selected.
            const isTextSelected = !!window.getSelection()?.toString();
            if (isTextSelected) {
                return;
            }

            logAmplitudeEvent(AnalyticsEvents.NAVIGATION, analyticsPayload);

            const isOpeningInNewWindow = e.ctrlKey || e.metaKey;
            if (isOpeningInNewWindow) {
                window.open(url);
                return;
            }

            if (canRouteClientSide && router) {
                router.push(url);
            } else {
                window.location.assign(url);
            }
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
        // Don't add event handlers to cards in editor view
        // as we want to let Content Studio add its own handlers
        // for drag&drop.
        if (pageConfig.editorView === 'edit') {
            return null;
        }

        return {
            onMouseEnter: handleUserEvent,
            onMouseLeave: handleUserEvent,
            onMouseDown: handleUserEvent,
            onMouseUp: handleUserEvent,
            onClick: handleUserEvent,
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
