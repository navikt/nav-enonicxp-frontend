import React from 'react';
import { FrontPageProps } from 'types/content-props/index-pages-props';
import { Header } from 'components/_common/headers/Header';
import { AreaCard } from 'components/_common/area-card/AreaCard';
import { FrontPageCard } from 'components/_common/frontpage-card/FrontPageCard';
import { classNames } from 'utils/classnames';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { CardType } from 'types/card';

import { ContentProps, ContentType } from 'types/content-props/_content-common';
import style from './FrontPageAreaNavigation.module.scss';

type Props = {
    content: FrontPageProps;
};

export const FrontPageAreaNavigation = ({ content }: Props) => {
    const { data } = content;
    const { areasHeader, navigationRefs = [], audience } = data;

    const getCardType = (audience: Audience) => {
        if (audience === Audience.EMPLOYER) {
            return CardType.EmployerFrontpage;
        }
        if (audience === Audience.PROVIDER) {
            return CardType.ProviderFrontpage;
        }
        if (audience === Audience.PERSON) {
            return CardType.PersonFrontPage;
        }
        return null;
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
        return null;
    };

    const cardType = getCardType(getAudience(audience));

    return (
        <div
            className={classNames(style.wrapper, style[getAudience(audience)])}
        >
            <Header
                level={'2'}
                justify={'left'}
                size={'large'}
                className={style.header}
            >
                {areasHeader}
            </Header>
            <nav aria-label="Velg område">
                <ul
                    className={classNames(
                        style.cards,
                        navigationRefs.length === 2
                            ? style.twocols
                            : style.threecols
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
                                    fallbackIllustration={!illustration}
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
