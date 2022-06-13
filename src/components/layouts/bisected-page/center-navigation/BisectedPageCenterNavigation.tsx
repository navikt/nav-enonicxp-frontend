import React from 'react';
import {
    ContentType,
    CustomContentProps,
} from '../../../../types/content-props/_content-common';

import style from './BisectedPageCenterNavigation.module.scss';

type Props = {
    pageProps: CustomContentProps;
};

export const BisectedPageCenterNavigation = ({ pageProps }: Props) => {
    const { __typename, data } = pageProps;

    if (pageProps.__typename === ContentType.FrontPage) {
        return (
            <div className={style.centerNavigation}>
                {pageProps.data.areasHeader}
            </div>
        );
    }

    return null;
};
