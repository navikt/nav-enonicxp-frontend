import React from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { BEM, classNames } from '../../../../utils/classnames';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { typoToComponent } from '../../../../types/typo-style';
import './Header.less';
import { PublicImage } from '../../../_common/image/PublicImage';

const bem = BEM('header-part');

export const Header = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, ingress, titleTypo, titleTag, anchorId, justify } = config;
    if (!title) {
        return null;
    }

    const TypoComponent = typoToComponent[titleTypo] || Innholdstittel;

    return (
        <div
            className={classNames(bem(), justify && bem(undefined, justify))}
            id={anchorId}
        >
            <TypoComponent tag={titleTag}>
                {title}
                {anchorId && (
                    <a
                        href={`#${anchorId}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        <PublicImage
                            imagePath={'/gfx/link.svg'}
                            className={bem('anchor-icon')}
                        />
                    </a>
                )}
            </TypoComponent>
            {ingress && <Ingress className={bem('ingress')}>{ingress}</Ingress>}
        </div>
    );
};
