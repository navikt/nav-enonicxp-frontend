import React, { useState } from 'react';
import {
    HeadingTag,
    TypoStyle,
    typoToComponent,
} from '../../../types/typo-style';
import { BEM, classNames } from '../../../utils/classnames';
import { Innholdstittel } from 'nav-frontend-typografi';
import { PublicImage } from '../image/PublicImage';
import './Header.less';

const bem = BEM('header');

type Props = {
    text: string;
    typoStyle: TypoStyle;
    tag: HeadingTag;
    justify?: string;
    anchorId?: string;
    className?: string;
};

export const Header = ({
    text,
    typoStyle,
    tag,
    justify,
    anchorId,
    className,
}: Props) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);

    const anchor = anchorId
        ? anchorId.startsWith('#')
            ? anchorId
            : `#${anchorId}`
        : undefined;

    const copyLinkToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator?.clipboard?.writeText) {
            const baseUrl = (e.target as HTMLAnchorElement)?.baseURI;
            if (baseUrl) {
                navigator?.clipboard?.writeText(`${baseUrl}${anchor}`);
                setShowCopyTooltip(true);
                setTimeout(() => setShowCopyTooltip(false), 1500);
            }
        }
    };

    const TypoComponent = typoToComponent[typoStyle] || Innholdstittel;

    return (
        <div
            className={classNames(
                bem(),
                justify && bem(undefined, justify),
                className
            )}
            id={anchorId}
        >
            <TypoComponent tag={tag}>{text}</TypoComponent>
            {anchor && (
                <>
                    <a href={anchor} onClick={copyLinkToClipboard}>
                        <PublicImage
                            imagePath={'/gfx/link.svg'}
                            className={bem('anchor-icon')}
                        />
                    </a>
                    <span
                        className={classNames(
                            bem('copy-tooltip'),
                            showCopyTooltip && bem('copy-tooltip', 'visible')
                        )}
                    >
                        {'Lenke kopiert'}
                    </span>
                </>
            )}
        </div>
    );
};
