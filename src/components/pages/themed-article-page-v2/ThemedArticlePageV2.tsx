import React from 'react';
import { ThemedArticlePageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import style from './ThemedArticlePageV2.module.scss';

export const ThemedArticlePageV2 = (props: ThemedArticlePageProps) => {
    return (
        <article className={style.themedArticlePage}>
            <ThemedPageHeader contentProps={props} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </article>
    );
};
