import React, { useEffect, useState } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';
import { IndexPageContentProps } from '../../IndexPage';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { IndexPageNavigationCallback } from '../routing/useIndexPageRouting';
import { getPublicPathname } from '../../../../../utils/urls';
import { AreaPageHeader } from './area-page-header/AreaPageHeader';
import { AreaCard } from '../../../../_common/area-card/AreaCard';

import style from './IndexPageAreasSection.module.scss';
import { windowScrollTo } from '../../../../../utils/scroll-to';

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

    const [currentId, setCurrentId] = useState(_id);
    const [currentType, setCurrentType] = useState<ContentType>(__typename);
    const [prevType, setPrevType] = useState<ContentType>();

    useEffect(() => {
        if (currentId === _id) {
            return;
        }

        setCurrentId(_id);
        setPrevType(currentType);
        setCurrentType(__typename);
    }, [__typename, currentType, currentId, _id]);

    const useFrontpageTransition =
        prevType === ContentType.FrontPage &&
        currentType === ContentType.AreaPage;

    return (
        <div
            className={classNames(
                __typename === ContentType.FrontPage && style.grid
            )}
        >
            {areaRefs.map((areaContent) => {
                const { _id } = areaContent;

                const isHeaderPanel =
                    __typename === ContentType.AreaPage && currentId === _id;

                return isHeaderPanel ? (
                    <AreaPageHeader
                        areaContent={pageProps}
                        className={classNames(
                            style.areaPanelActive
                            // useFrontpageTransition && style.animate
                        )}
                        key={_id}
                    />
                ) : (
                    <AreaCard
                        path={getPublicPathname(areaContent)}
                        title={areaContent.data.header}
                        area={areaContent.data.area}
                        navigate={navigate}
                        linkGroup={'frontpage-area-navigation'}
                        className={classNames(
                            style.areaPanel,
                            currentType === ContentType.AreaPage &&
                                style.areaPanelHidden
                            // useFrontpageTransition && style.animate
                        )}
                        onClick={() => {
                            windowScrollTo(0);
                        }}
                        key={_id}
                    />
                );
            })}
        </div>
    );
};
