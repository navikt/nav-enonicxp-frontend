import React, { useState } from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { BEM, classNames } from '../../../../utils/classnames';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { typoToComponent } from '../../../../types/typo-style';
import { PublicImage } from '../../../_common/image/PublicImage';
import './Header.less';

const bem = BEM('header-part');

export const Header = ({ config }: HeaderProps) => {
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);

    if (!config) {
        return null;
    }

    const { title, ingress, titleTypo, titleTag, anchorId, justify } = config;

    if (!title) {
        return null;
    }

    const anchor = `#${anchorId}`;

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

    const TypoComponent = typoToComponent[titleTypo] || Innholdstittel;

    return (
        <div
            className={classNames(bem(), justify && bem(undefined, justify))}
            id={anchorId}
        >
            <TypoComponent tag={titleTag}>{title}</TypoComponent>
            {anchorId && (
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
            {ingress && <Ingress className={bem('ingress')}>{ingress}</Ingress>}
        </div>
    );
};
