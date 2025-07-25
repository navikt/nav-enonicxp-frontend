import React from 'react';
import { useRouter } from 'next/compat/router';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { CardSize, CardType } from 'types/card';
import { Interaction } from 'types/interaction';
import { LinkProps } from 'types/link-props';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePublicUrl } from 'utils/usePublicUrl';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';

type AnalyticsProps = {
    analyticsLinkGroup?: string;
    analyticsLabel: string;
    analyticsComponent: string;
};

type HandleUserEvent = (e: React.MouseEvent | React.TouchEvent) => void;

type UserEventProps = {
    onTouchStart: HandleUserEvent;
    onTouchEnd: HandleUserEvent;
    onTouchCancel: HandleUserEvent;
    onTouchMove: HandleUserEvent;
};

type UseCardState = {
    analyticsProps: AnalyticsProps;
    userEventProps: UserEventProps | null;
};

type UseCardSettings = {
    type: CardType;
    size: CardSize;
    link: LinkProps;
};

export const useCard = ({ link, size, type }: UseCardSettings): UseCardState => {
    const router = useRouter();
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { editorView } = contentProps;
    const { layoutConfig } = useLayoutConfig();
    const { url, canRouteClientSide } = usePublicUrl(link.url);

    const getComponentAnalyticsName = (type: CardType, size: CardSize) => {
        if (type === CardType.Provider) {
            return 'Tilbyderkort';
        }

        if (size === CardSize.Mini) {
            return 'Kort mini';
        }

        if (size === CardSize.Micro) {
            return 'Kort mikro';
        }

        return 'Kort';
    };

    const analyticsPayload = {
        komponent: getComponentAnalyticsName(type, size),
        lenkegruppe: layoutConfig.title,
        seksjon: layoutConfig.title,
        destinasjon: link.url,
        lenketekst: link.text,
        målgruppe: context,
        innholdstype: innholdsTypeMap[contentProps.type],
    };

    const handleUserEvent = (e: React.MouseEvent | React.TouchEvent): void => {
        const eventType = e.type.toString() as keyof typeof Interaction;
        const type = Interaction[eventType];

        e.stopPropagation();

        if (type === Interaction.touch || type === Interaction.click) {
            // User should be able to select text for text-to-speech, so abort all
            // routing if clicking is captured while text is selected.
            const isTextSelected = !!window.getSelection()?.toString();
            if (isTextSelected) {
                return;
            }

            logAnalyticsEvent(AnalyticsEvents.NAVIGATION, analyticsPayload);

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
        if (editorView === 'edit') {
            return null;
        }

        return {
            onClick: handleUserEvent,
            onTouchStart: handleUserEvent,
            onTouchEnd: handleUserEvent,
            onTouchCancel: handleUserEvent,
            onTouchMove: handleUserEvent,
        };
    };

    return {
        analyticsProps: buildAnalyticsProps(),
        userEventProps: buildUserEventProps(),
    };
};
