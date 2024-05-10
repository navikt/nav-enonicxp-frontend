import React from 'react';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    title: string;
};

export const PageNavigationMenu = ({ anchorLinks = [], title }: Props) => {
    const links = getValidLinks(anchorLinks);

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div className={style.wrapper}>
                <Heading level="2" size="small" spacing>
                    {title}
                    {/* TODO: skal være "Innhold på siden", ikke "Innhold". Settes redaksjonelt, men kunne kanskje hardkodes? */}
                </Heading>
                {/* TODO: legg inn igjen denne? <nav aria-label={'Innhold'}>  */}
                <ul className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <LenkeBase
                                href={`#${anchorLink.anchorId}`}
                                analyticsLinkGroup={'Innhold'}
                                analyticsComponent={'Meny for intern-navigasjon'}
                                className={style.link}
                            >
                                <ArrowDownRightIcon />
                                {anchorLink.linkText}
                            </LenkeBase>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
