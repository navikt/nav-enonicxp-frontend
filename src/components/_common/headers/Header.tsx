import React, { useState } from 'react';
import { Title } from '@navikt/ds-react';
import { Level, Size } from '../../../types/typo-style';
import { BEM, classNames } from '../../../utils/classnames';
import { PublicImage } from '../image/PublicImage';
import { HeaderCommonConfig } from '../../../types/component-props/_mixins';
import './Header.less';

const bem = BEM('header');

const linkCopiedDisplayTimeMs = 2500;

type Props = {
    children: string;
    level: Level;
    size: Size;
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

    return (
        <div
            className={classNames(
                bem(),
                justify && bem(undefined, justify),
                className
            )}
            id={setId ? anchorId : undefined}
            tabIndex={-1}
        >
            <Title size={size} level={level}>
                {children}
            </Title>
            {anchor && !hideCopyButton && (
                <span className={bem('copy-link-container')}>
                    <a
                        href={anchor}
                        onClick={copyLinkToClipboard}
                        className={bem('copy-link')}
                    >
                        <PublicImage
                            imagePath={'/gfx/link.svg'}
                            className={bem('anchor-icon')}
                            alt={'Kopier lenke'}
                        />
                        {'Kopier lenke'}
                    </a>
                    <span
                        className={classNames(
                            bem('copy-tooltip'),
                            showCopyTooltip && bem('copy-tooltip', 'visible')
                        )}
                    >
                        {'Lenken er kopiert'}
                    </span>
                </span>
            )}
        </div>
    );
};
