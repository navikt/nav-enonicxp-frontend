import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';
import { Header } from '../../../_common/headers/Header';

import style from './IndexPageNavigation.module.scss';

type Props = {
    pageProps: ContentProps;
};

export const IndexPageNavigation = ({ pageProps }: Props) => {
    const { __typename, data } = pageProps;

    if (__typename === ContentType.FrontPage) {
        return (
            <div className={style.centerNavigation}>
                <Header level={'2'} justify={'left'} size={'large'}>
                    {data.areasHeader}
                </Header>
            </div>
        );
    }

    return null;
};
