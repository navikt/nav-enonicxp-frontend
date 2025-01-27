import React, { useState } from 'react';
import { LinkIcon } from '@navikt/aksel-icons';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';

import style from './copyLink.module.scss';

type CopyLinkProps = {
    anchor: string;
    heading: string;
    className?: string;
    showLabel?: boolean;
};

const linkCopiedDisplayTimeMs = 2500;

export const CopyLink = ({ anchor, heading, className, showLabel = true }: CopyLinkProps) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { language, type } = contentProps;
    const { layoutConfig } = useLayoutConfig();
    const getLabel = translator('header', language);

    if (!anchor) {
        return null;
    }

    const copyLinkToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator?.clipboard?.writeText) {
            const baseUrl = (e.target as HTMLAnchorElement)?.baseURI?.split('#')[0];
            if (baseUrl) {
                navigator?.clipboard?.writeText(`${baseUrl}${anchor}`);
                setShowCopyTooltip(true);
                setTimeout(() => setShowCopyTooltip(false), linkCopiedDisplayTimeMs);
            }
            logAnalyticsEvent(AnalyticsEvents.COPY_LINK, {
                målgruppe: context,
                seksjon: layoutConfig.title,
                innholdstype: innholdsTypeMap[type],
            });
        }
    };

    return (
        <span className={classNames(style.copyLinkContainer, className)}>
            <a
                href={anchor}
                onClick={copyLinkToClipboard}
                className={style.copyLink}
                aria-label={`${getLabel('copyLinkTo')}: "${heading}"`}
            >
                <LinkIcon className={style.anchorIcon} aria-hidden />
                {showLabel && getLabel('copyLink')}
            </a>
            <span
                className={classNames(
                    style.copyTooltip,
                    showCopyTooltip && style.copyTooltipVisible
                )}
                aria-live="assertive"
                aria-atomic={true}
            >
                {getLabel('copiedLinkConfirmed')}
            </span>
        </span>
    );
};
