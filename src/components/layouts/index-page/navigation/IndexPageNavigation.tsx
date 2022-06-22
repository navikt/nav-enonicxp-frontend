import React from 'react';
import { ContentType } from '../../../../types/content-props/_content-common';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../../types/content-props/index-pages-props';
import { IndexPageAreasPanels } from './area-panels/IndexPageAreasPanels';
import { AreaPageNavigationBar } from './area-page-navigation/AreaPageNavigationBar';
import { FrontPageAreasHeader } from './front-page-areas-header/FrontPageAreasHeader';

import style from './IndexPageNavigation.module.scss';
import { AnimateHeight } from '../../../_common/animate-height/AnimateHeight';

type Props = {
    pageProps: FrontPageProps | AreaPageProps;
    navigate: (path: string) => void;
};

export const IndexPageNavigation = ({ pageProps, navigate }: Props) => {
    const { __typename, _id, data } = pageProps;
    const { areasRefs } = data;

    return (
        <div className={style.centerNavigation}>
            <AreaPageNavigationBar
                isVisible={__typename === ContentType.AreaPage}
                areasRefs={areasRefs}
                pageId={_id}
                navigate={navigate}
            />
            <FrontPageAreasHeader content={pageProps} />
            {/*<AnimateHeight trigger={_id}>*/}
            <IndexPageAreasPanels content={pageProps} navigate={navigate} />
            {/*</AnimateHeight>*/}
        </div>
    );
};
