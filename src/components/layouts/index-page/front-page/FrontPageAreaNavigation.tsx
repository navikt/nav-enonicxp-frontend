import React from 'react';
import { FrontPageProps } from 'types/content-props/index-pages-props';
import { Header } from 'components/_common/headers/Header';
import { AreaCard } from 'components/_common/area-card/AreaCard';
import { EmployerCard } from 'components/_common/employer-card/EmployerCard';
import { classNames } from 'utils/classnames';
import { getAudience } from 'types/component-props/_mixins';

import style from './FrontPageAreaNavigation.module.scss';

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
        audience,
    } = data;

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
                            <EmployerCard
                                illustration={content.data?.illustration}
                                path={content._path}
                                title={
                                    content.data?.title || content.displayName
                                }
                            />
                        </li>
                    ))}
                    {situationsRefs.map((situationPage) => {
                        return (
                            <li key={situationPage._id}>
                                <EmployerCard
                                    illustration={
                                        situationPage.data?.illustration
                                    }
                                    path={situationPage._path}
                                    title={
                                        situationPage.data?.title ||
                                        situationPage.displayName
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
