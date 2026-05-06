import React, { PropsWithChildren, useRef, useState } from 'react';
import { ReadMore } from '@navikt/ds-react';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';
import { Snarveier, useSnarveier } from 'utils/useSnarveier';
import { ProductDetailType } from 'types/content-props/product-details';
import { useCheckAndOpenPanel } from 'store/hooks/useCheckAndOpenPanel';
import style from './Expandable.module.scss';

type Props = PropsWithChildren<{
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    expandableType?: ProductDetailType | 'documentation_requirements';
    ariaLabel?: string;
    isOpenDefault?: boolean;
}>;

export const Expandable = ({
    title,
    anchorId,
    analyticsOriginTag,
    children,
    className,
    expandableType,
    ariaLabel,
    isOpenDefault,
}: Props) => {
    const contentProps = usePageContentProps();
    const [isOpen, setIsOpen] = useState(isOpenDefault ?? contentProps.expandAll ?? false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const { context } = getDecoratorParams(contentProps);

    useSnarveier({ shortcut: Snarveier.SEARCH, callback: () => setIsOpen(true) });
    useCheckAndOpenPanel(isOpen, setIsOpen, wrapperRef, anchorId);

    const toggleExpandCollapse = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        handleStickyScrollOffset(isOpening, wrapperRef.current);
        logAnalyticsEvent(
            isOpening ? AnalyticsEvents.ACCORDION_APNET : AnalyticsEvents.ACCORDION_LUKKET,
            {
                tittel,
                opprinnelse: analyticsOriginTag || 'utvidbar tekst',
                komponentId: 'Expandable',
                målgruppe: context,
                innholdstype: innholdsTypeMap[contentProps.type],
            }
        );
    };

    // Adjust appearance in styling if type was not set for this content. This is the wrong use of this component, but some legacy pages have yet to be upgraded editorially.
    const isLegacyUsage = !expandableType;

    return (
        <div id={anchorId} ref={wrapperRef} tabIndex={-1}>
            <ReadMore
                className={classNames(className, style.expandable, isLegacyUsage && style.legacy)}
                header={title}
                open={isOpen}
                onOpenChange={(isOpen) => toggleExpandCollapse(isOpen, title)}
                aria-label={ariaLabel || title}
                variant="moderate"
                size="large"
            >
                {children}
            </ReadMore>
        </div>
    );
};
