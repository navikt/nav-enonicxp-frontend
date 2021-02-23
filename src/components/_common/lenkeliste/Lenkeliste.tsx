import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from '../lenke/LenkeStandalone';
import { BEM, classNames } from 'utils/classnames';
import './Lenkeliste.less';

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    className?: string;
};

export const Lenkeliste = ({ tittel, lenker, className }: Props) => {
    if (!lenker || lenker.length === 0) {
        return null;
    }

    const bem = BEM('lenkeliste');

    return (
        <section
            className={classNames(bem(), className)}
            data-portal-component-type="part"
            aria-label={tittel}
        >
            {tittel && (
                <div className={bem('tittel')}>
                    <Undertittel>{tittel}</Undertittel>
                </div>
            )}
            <nav className={bem('lenker')}>
                {lenker.map((lenke, index) => (
                    <LenkeStandalone
                        href={lenke.url}
                        label={lenke.label}
                        key={index}
                        className={bem('lenke')}
                        component={'link-list'}
                        linkGroup={tittel}
                    >
                        {lenke.text}
                    </LenkeStandalone>
                ))}
            </nav>
        </section>
    );
};
