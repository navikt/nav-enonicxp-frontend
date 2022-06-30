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
    const { __typename, _id } = pageProps;

    const isAreapage = __typename === ContentType.AreaPage;

    return (
        <div className={classNames(!isAreapage && style.grid)}>
            {isAreapage ? (
                <AreaPageHeader
                    areaContent={pageProps}
                    className={classNames(style.areaPageHeader)}
                    key={_id}
                />
            ) : (
                areaRefs.map((areaContent) => (
                    <AreaCard
                        path={getPublicPathname(areaContent)}
                        title={areaContent.data.header}
                        area={areaContent.data.area}
                        navigate={navigate}
                        linkGroup={pageProps.data.areasHeader}
                        className={classNames(style.areaCard)}
                        onClick={() => {
                            windowScrollTo(0);
                        }}
                        key={areaContent._id}
                    />
                ))
            )}
        </div>
    );
};
