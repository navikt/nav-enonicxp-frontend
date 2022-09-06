import React from 'react';
import { FrontPageProps } from '../../../../types/content-props/index-pages-props';
import { Header } from '../../../_common/headers/Header';
import { AreaCard } from '../../../_common/area-card/AreaCard';
import { getPublicPathname } from '../../../../utils/urls';
import { windowScrollTo } from '../../../../utils/scroll-to';

import style from './FrontPageAreaNavigation.module.scss';

type Props = {
    content: FrontPageProps;
};

export const FrontPageAreaNavigation = ({ content }: Props) => {
    const { data } = content;
    const { areasHeader, areasRefs } = data;

    return (
        <div className={style.wrapper}>
            <Header
                level={'2'}
                justify={'left'}
                size={'large'}
                className={style.header}
            >
                {areasHeader}
            </Header>
            <nav>
                <ul className={style.cards}>
                    {areasRefs.map((areaContent) => (
                        <li key={areaContent._id}>
                            <AreaCard
                                path={getPublicPathname(areaContent)}
                                title={areaContent.data.header}
                                area={areaContent.data.area}
                                linkGroup={areasHeader}
                                onClick={() => {
                                    windowScrollTo(0);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
