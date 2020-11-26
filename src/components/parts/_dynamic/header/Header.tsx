import React from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { BEM } from '../../../../utils/bem';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';
import './Header.less';

const bem = BEM('header');

export const Header = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, ingress } = config;

    return (
        <div className={bem()}>
            {title && <Sidetittel>{title}</Sidetittel>}
            {ingress && <Ingress>{ingress}</Ingress>}
        </div>
    );
};
