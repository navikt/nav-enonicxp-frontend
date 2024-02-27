import React from 'react';
import { FrontPageProps } from 'types/content-props/index-pages-props';
import { Header } from 'components/_common/headers/Header';
import { AreaCard } from 'components/_common/area-card/AreaCard';
import { FrontPageCard } from 'components/_common/frontpage-card/FrontPageCard';
import { classNames } from 'utils/classnames';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { CardType } from 'types/card';

import style from './FrontPageAreaNavigation.module.scss';
import { ContentType } from 'types/content-props/_content-common';

type Props = {
    content: FrontPageProps;
};

export const FrontPageAreaNavigation = ({ content }: Props) => {
    const { data } = content;
    const {
        areasHeader,
        areasRefs = [],
        situationsRefs = [],
        frontPageNestedRefs = [],
        otherRefs = [],
        audience,
    } = data;

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
                <ul className={style.cards}>
                    {areasRefs.map((areaContent) => (
                        <li key={areaContent._id}>
                            <AreaCard
                                path={areaContent._path}
                                title={areaContent.data.header}
                                area={areaContent.data.area}
                                linkGroup={areasHeader}
                            />
                        </li>
                    ))}
                    {frontPageNestedRefs.map((content) => (
                        <li key={content._id}>
                            <FrontPageCard
                                illustration={content.data?.illustration}
                                path={content._path}
                                title={
                                    content.data?.title || content.displayName
                                }
                                type={cardType}
                            />
                        </li>
                    ))}
                    {situationsRefs.map((situationPage) => {
                        return (
                            <li key={situationPage._id}>
                                <FrontPageCard
                                    illustration={
                                        situationPage.data?.illustration
                                    }
                                    path={situationPage._path}
                                    title={
                                        situationPage.data?.title ||
                                        situationPage.displayName
                                    }
                                    type={cardType}
                                />
                            </li>
                        );
                    })}
                    {otherRefs.map((page) => {
                        let illustration = null;
                        if (
                            page.type === ContentType.Overview ||
                            page.type === ContentType.FormsOverview
                        ) {
                            illustration = page.data?.illustration;
                        }

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
