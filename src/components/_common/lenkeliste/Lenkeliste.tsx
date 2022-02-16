import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from '../lenke/LenkeStandalone';
import { classNames } from 'utils/classnames';
import style from './Lenkeliste.module.scss';

type Props = {
    lenker: LinkProps[];
    tittel?: string;
    withChevron?: boolean;
    className?: string;
};

export const Lenkeliste = ({
    tittel,
    lenker,
    withChevron = false,
    className,
}: Props) => {
    if (!lenker || lenker.length === 0) {
        return null;
    }

    return (
        <section
            className={classNames(style.lenkeliste, className)}
            aria-label={tittel}
        >
            {tittel && (
                <div className={style.tittel}>
                    <Heading size="small" level="2">
                        {tittel}
                    </Heading>
                </div>
            )}
            <nav className={style.lenker}>
                {lenker.map((lenke, index) => (
                    <LenkeStandalone
                        href={lenke.url}
                        label={lenke.label}
                        key={index}
                        className={style.lenke}
                        component={'link-list'}
                        linkGroup={tittel}
                        showExternalLinkLabel={true}
                        withChevron={withChevron}
                    >
                        {lenke.text}
                    </LenkeStandalone>
                ))}
            </nav>
        </section>
    );
};
