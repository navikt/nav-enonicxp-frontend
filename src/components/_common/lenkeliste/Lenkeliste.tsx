import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LinkProps } from 'types/link-props';
import { LenkeNavNo } from '../lenke/LenkeNavNo';
import { BEM } from 'utils/bem';
import './Lenkeliste.less';

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    className?: string;
};

export const Lenkeliste = ({ tittel, lenker, className }: Props) => {
    const bem = BEM('lenkeliste');

    return (
        <div
            className={`${bem()} ${className || ''}`}
            data-portal-component-type="part"
        >
            <div className={bem('tittel')}>
                {tittel && <Undertittel>{tittel}</Undertittel>}
            </div>
            <nav className={bem('lenker')}>
                {lenker.map((lenke, index) => (
                    <LenkeNavNo
                        href={lenke.url}
                        label={lenke.label}
                        key={index}
                        className={bem('lenke')}
                        component={'link-list'}
                        linkGroup={tittel}
                    >
                        {lenke.text}
                    </LenkeNavNo>
                ))}
            </nav>
        </div>
    );
};
