import React from 'react';
import { Title } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { LenkeStandalone } from '../lenke/LenkeStandalone';
import { BEM, classNames } from 'utils/classnames';
import './Lenkeliste.less';

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

    const bem = BEM('lenkeliste');

    return (
        <section className={classNames(bem(), className)} aria-label={tittel}>
            {tittel && (
                <div className={bem('tittel')}>
                    <Title size="s" level={2}>
                        {tittel}
                    </Title>
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
