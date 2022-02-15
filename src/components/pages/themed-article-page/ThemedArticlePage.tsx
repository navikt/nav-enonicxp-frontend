import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { ThemedArticlePageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { BEM } from '../../../utils/classnames';

import style from './ThemedArticlePage.module.scss';

export const ThemedArticlePage = (props: ThemedArticlePageProps) => {
    return (
        <div className={style['themed-article-page']}>
            <ThemedPageHeader contentProps={props} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
