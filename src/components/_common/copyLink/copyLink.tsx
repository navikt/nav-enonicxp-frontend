import React, { useState } from 'react';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { StaticImage } from '../image/StaticImage';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';

import linkIcon from '/public/gfx/link.svg';
import style from './copyLink.module.scss';

type CopyLinkProps = {
    anchor: string;
    className?: string;
    label?: string;
};

const linkCopiedDisplayTimeMs = 2500;

export const CopyLink = ({ anchor, label, className }: CopyLinkProps) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getLabel = translator('header', language);

    if (!anchor) {
        return null;
    }

    const copyLinkToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator?.clipboard?.writeText) {
            const baseUrl = (e.target as HTMLAnchorElement)?.baseURI?.split(
                '#'
            )[0];
            if (baseUrl) {
                navigator?.clipboard?.writeText(`${baseUrl}${anchor}`);
                setShowCopyTooltip(true);
                setTimeout(
                    () => setShowCopyTooltip(false),
                    linkCopiedDisplayTimeMs
                );
            }
            logAmplitudeEvent(AnalyticsEvents.COPY_LINK, {
                seksjon: layoutConfig.title,
            });
        }
    };

    return (
        <span className={classNames(style.copyLinkContainer, className)}>
            <a
                href={anchor}
                onClick={copyLinkToClipboard}
                className={style.copyLink}
            >
                <StaticImage
                    imageData={linkIcon}
                    alt={''}
                    className={style.anchorIcon}
                />
                {label || getLabel('copyLink')}
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
