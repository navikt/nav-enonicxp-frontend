import React from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import { AreaPageNavigationBar } from './area-page-navigation-bar/AreaPageNavigationBar';
import { FrontPageHeader } from './front-page-header/FrontPageHeader';
import { IndexPageNavigationCallback } from './routing/useIndexPageRouting';
import { IndexPageAreasSection } from './areas-section/IndexPageAreasSection';
import { IndexPageContentProps } from '../IndexPage';
import { classNames } from '../../../../utils/classnames';

import style from './IndexPageNavigation.module.scss';

type Props = {
    pageProps: IndexPageContentProps;
    navigate: IndexPageNavigationCallback;
};

export const IndexPageNavigation = ({ pageProps, navigate }: Props) => {
    const { __typename, _id, data } = pageProps;
    const { areasRefs: _areasRefs } = data;

    const isAreaPage = __typename === ContentType.AreaPage;

    const areaRefs =
        isAreaPage && !_areasRefs.some((ref) => ref._id === _id)
            ? [pageProps, ..._areasRefs]
            : _areasRefs;

    return (
        <div
            className={classNames(
                style.areaNavigation,
                isAreaPage && style.areaPage
            )}
        >
            <div className={style.headerAndNavBar}>
                <AreaPageNavigationBar
                    isVisible={isAreaPage}
                    areasRefs={areaRefs}
                    pageId={_id}
                    header={isAreaPage && pageProps.data.header}
                    navigate={navigate}
                />
                <FrontPageHeader content={pageProps} />
            </div>
            <IndexPageAreasSection
                pageProps={pageProps}
                areaRefs={areaRefs}
                navigate={navigate}
            />
        </div>
    );
};
