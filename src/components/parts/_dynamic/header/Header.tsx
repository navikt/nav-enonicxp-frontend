import React from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { BEM } from '../../../../utils/bem';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { typoToComponent } from '../../../../types/typo-style';
import './Header.less';

const bem = BEM('header');

export const Header = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, ingress, titleTypo, titleTag, anchorId } = config;
    if (!title) {
        return null;
    }

    const TypoComponent = typoToComponent[titleTypo] || Innholdstittel;

    return (
        <div className={bem()} id={anchorId}>
            <TypoComponent tag={titleTag}>{title}</TypoComponent>
            {ingress && <Ingress>{ingress}</Ingress>}
        </div>
    );
};
