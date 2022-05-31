import React, { useState } from 'react';

import { StaticImage } from '../image/StaticImage';
import { classNames } from '../../../utils/classnames';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import linkIcon from '/public/gfx/link.svg';

import style from './copyLink.module.scss';

type CopyLinkProps = {
    anchor: string;
    label?: string;
};

const linkCopiedDisplayTimeMs = 2500;

export const CopyLink = ({ anchor, label }: CopyLinkProps) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const { language } = usePageConfig();

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
        }
    };

    return (
        <span className={style.copyLinkContainer}>
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
            >
                {getLabel('copiedLink')}
            </span>
        </span>
    );
};
