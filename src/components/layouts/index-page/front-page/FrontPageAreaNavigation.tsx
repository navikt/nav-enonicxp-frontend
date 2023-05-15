import React from 'react';
import { FrontPageProps } from 'types/content-props/index-pages-props';
import { Header } from 'components/_common/headers/Header';
import { AreaCard } from 'components/_common/area-card/AreaCard';

import style from './FrontPageAreaNavigation.module.scss';
import { EmployerCard } from 'components/_common/employer-card/EmployerCard';
import classNames from 'classnames';

type Props = {
    content: FrontPageProps;
};

export const FrontPageAreaNavigation = ({ content }: Props) => {
    const { data } = content;
    const { areasHeader, areasRefs, situationsRefs, audience } = data;

    return (
        <div className={classNames(style.wrapper, style[audience])}>
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
                    {situationsRefs.map((situationPage) => {
                        return (
                            <li key={situationPage._id}>
                                <EmployerCard
                                    illustration={
                                        situationPage.data.illustration
                                    }
                                    path={situationPage._path}
                                    title={
                                        situationPage.data.title ||
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
