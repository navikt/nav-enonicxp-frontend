import React, { useEffect, useState } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { IndexPageNavigationCallback } from '../routing/useIndexPageRouting';
import { getPublicPathname } from '../../../../../utils/urls';
import { AreaPageHeader } from './area-page-header/AreaPageHeader';
import { AreaCard } from '../../../../_common/area-card/AreaCard';
import { windowScrollTo } from '../../../../../utils/scroll-to';

import style from './IndexPageAreasSection.module.scss';

type Props = {
    pageProps: IndexPageContentProps;
    areaRefs: AreaPageProps[];
    navigate: IndexPageNavigationCallback;
};

export const IndexPageAreasSection = ({
    pageProps,
    areaRefs,
    navigate,
}: Props) => {
    return (
        <nav>
            <ul className={style.cards}>
                {areaRefs.map((areaContent) => (
                    <li key={areaContent._id}>
                        <AreaCard
                            path={getPublicPathname(areaContent)}
                            title={areaContent.data.header}
                            area={areaContent.data.area}
                            navigate={navigate}
                            linkGroup={pageProps.data.areasHeader}
                            onClick={() => {
                                windowScrollTo(0);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
