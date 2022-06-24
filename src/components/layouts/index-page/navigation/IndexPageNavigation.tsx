import React from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../../types/content-props/index-pages-props';
import { AreaPageNavigationBar } from './area-page-navigation-bar/AreaPageNavigationBar';
import { FrontPageAreasHeader } from './front-page-areas-header/FrontPageAreasHeader';

import style from './IndexPageNavigation.module.scss';
import { classNames } from '../../../../utils/classnames';
import { AreaHeaderPanel } from './area-panels/header-panel/AreaHeaderPanel';

type Props = {
    pageProps: FrontPageProps | AreaPageProps;
    navigate: (path: string) => void;
};

export const IndexPageNavigation = ({ pageProps, navigate }: Props) => {
    const { __typename, _id, data } = pageProps;
    const { areasRefs: _areasRefs } = data;

    const areasRefs =
        __typename === ContentType.AreaPage &&
        !_areasRefs.some((ref) => ref._id === _id)
            ? [pageProps, ..._areasRefs]
            : _areasRefs;

    return (
        <div className={style.centerNavigation}>
            <div className={style.headerAndNavBar}>
                <AreaPageNavigationBar
                    isVisible={__typename === ContentType.AreaPage}
                    areasRefs={areasRefs}
                    pageId={_id}
                    navigate={navigate}
                />
                <FrontPageAreasHeader content={pageProps} />
            </div>
            {/*<AnimateHeight trigger={_id}>*/}
            <div
                className={classNames(
                    __typename === ContentType.FrontPage && style.grid
                )}
            >
                {areasRefs.map((areaContent) => {
                    return (
                        <AreaHeaderPanel
                            areaContent={areaContent}
                            currentContent={pageProps}
                            navigate={navigate}
                            key={areaContent._id}
                        />
                    );
                })}
            </div>
            {/*</AnimateHeight>*/}
        </div>
    );
};
