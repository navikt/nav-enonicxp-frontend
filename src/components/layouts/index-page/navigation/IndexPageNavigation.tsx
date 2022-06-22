import React from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../../types/content-props/index-pages-props';
import { IndexPageAreaPanels } from './area-panels/IndexPageAreaPanels';
import { AreaPageNavigationBar } from './area-page-navigation/AreaPageNavigationBar';
import { FrontPageAreasHeader } from './front-page-areas-header/FrontPageAreasHeader';
import { AnimateHeight } from '../../../_common/animate-height/AnimateHeight';

import style from './IndexPageNavigation.module.scss';

type Props = {
    pageProps: FrontPageProps | AreaPageProps;
};

export const IndexPageNavigation = ({ pageProps }: Props) => {
    const { __typename, _id, data } = pageProps;
    const { areasRefs } = data;

    return (
        <div className={style.centerNavigation}>
            {/*<AnimateHeight trigger={_id} fadeTime={0}>*/}
            <AreaPageNavigationBar
                isVisible={__typename === ContentType.AreaPage}
                areasRefs={areasRefs}
                pageId={_id}
            />
            {/*</AnimateHeight>*/}
            <FrontPageAreasHeader content={pageProps} />
            {/*<AnimateHeight trigger={_id}>*/}
            <IndexPageAreaPanels content={pageProps} />
            {/*</AnimateHeight>*/}
        </div>
    );
};
