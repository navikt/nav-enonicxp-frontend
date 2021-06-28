import React, { useState } from 'react';
import {
    HeadingTag,
    headingToTypoStyle,
    TypoStyle,
    typoToComponent,
} from '../../../types/typo-style';
import { BEM, classNames } from '../../../utils/classnames';
import { Innholdstittel } from 'nav-frontend-typografi';
import { PublicImage } from '../image/PublicImage';
import { HeaderCommonConfig } from '../../../types/component-props/_mixins';
import './Header.less';

const bem = BEM('header');

const linkCopiedDisplayTimeMs = 2500;

type Props = {
    children: string;
    tag: HeadingTag;
    typoStyle?: TypoStyle;
    justify?: HeaderCommonConfig['justify'];
    hideCopyButton?: boolean;
    anchorId?: string;
    setId?: boolean;
    className?: string;
};

export const Header = ({
    children,
    tag,
    typoStyle,
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
    const _typoStyle = typoStyle || headingToTypoStyle[tag];
    const TypoComponent = typoToComponent[_typoStyle] || Innholdstittel;

    return (
        <div
            className={classNames(
                bem(),
                justify && bem(undefined, justify),
                className
            )}
            id={setId && anchorId}
            tabIndex={-1}
        >
            <TypoComponent tag={tag}>{children}</TypoComponent>
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
