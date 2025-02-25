import React from 'react';
import { FrontPageProps } from 'types/content-props/index-pages-props';
import { Header } from 'components/_common/headers/Header';
import { AreaCard } from 'components/_common/areaCard/AreaCard';
import { FrontPageCard } from 'components/_common/frontpageCard/FrontPageCard';
import { classNames } from 'utils/classnames';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { CardType } from 'types/card';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

import style from './FrontPageAreaNavigation.module.scss';

const audienceCardType: Record<Audience, CardType> = {
    [Audience.EMPLOYER]: CardType.EmployerFrontpage,
    [Audience.PROVIDER]: CardType.ProviderFrontpage,
    [Audience.PERSON]: CardType.PersonFrontPage,
};

const getIllustrationFromProps = (page: ContentProps) => {
    if (
        page.type === ContentType.Overview ||
        page.type === ContentType.FormsOverview ||
        page.type === ContentType.FrontPageNested ||
        page.type === ContentType.SituationPage
    ) {
        return page.data?.illustration;
    }
    return undefined;
};

type Props = {
    content: FrontPageProps;
};

export const FrontPageAreaNavigation = ({ content }: Props) => {
    const { areasHeader, navigationRefs = [] } = content.data;

    const audience = getAudience(content.data.audience);

    const cardType = audienceCardType[audience];

    return (
        <div className={classNames(style.wrapper, audience && style[audience])}>
            <Header level={'2'} size={'large'} className={style.header}>
                {areasHeader}
            </Header>
            <nav aria-label="Velg område">
                <ul
                    className={classNames(
                        style.cards,
                        navigationRefs.length === 2 ? style.twocols : style.threecols
                    )}
                >
                    {navigationRefs.map((page) => {
                        if (page.type === ContentType.AreaPage) {
                            return (
                                <li key={page._id}>
                                    <AreaCard
                                        path={page._path}
                                        title={page.data.header}
                                        area={page.data.area}
                                        linkGroup={areasHeader}
                                    />
                                </li>
                            );
                        }

                        const illustration = getIllustrationFromProps(page);

                        return (
                            <li key={page._id}>
                                <FrontPageCard
                                    illustration={illustration}
                                    path={page._path}
                                    title={page.data?.title || page.displayName}
                                    type={cardType}
                                    tryFallbackIllustration={!illustration}
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
