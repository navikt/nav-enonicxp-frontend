import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';

import { classNames } from '../../../utils/classnames';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { Level, levelToSize, Size } from '../../../types/typo-style';
import { PublicImage } from '../image/PublicImage';
import { HeaderCommonConfig } from '../../../types/component-props/_mixins';

import style from './Header.module.scss';

const linkCopiedDisplayTimeMs = 2500;

type Props = {
    children: string;
    level: Level;
    size?: Size;
    justify?: HeaderCommonConfig['justify'];
    hideCopyButton?: boolean;
    anchorId?: string;
    setId?: boolean;
    className?: string;
};

export const Header = ({
    children,
    size,
    level,
    justify,
    hideCopyButton,
    anchorId,
    setId = true,
    className,
}: Props) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const { language } = usePageConfig();

    const getLabel = translator('header', language);

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

    const anchor = anchorId
        ? anchorId.startsWith('#')
            ? anchorId
            : `#${anchorId}`
        : undefined;

    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div
            className={classNames(
                style.header,
                style[`header__${justify}`],
                className
            )}
            id={setId ? anchorId : undefined}
            tabIndex={-1}
        >
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {children}
            </Heading>
            {anchor && !hideCopyButton && (
                <span className={style.copyLinkContainer}>
                    <a
                        href={anchor}
                        onClick={copyLinkToClipboard}
                        className={style.copyLink}
                    >
                        <PublicImage
                            imagePath={'/gfx/link.svg'}
                            alt={''}
                            className={style.anchorIcon}
                        />
                        {getLabel('copyLink')}
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
            )}
        </div>
    );
};
