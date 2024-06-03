import React from 'react';
import { ThemedArticlePageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';

import style from './ThemedArticlePage.module.scss';

export const ThemedArticlePage = (props: ThemedArticlePageProps) => {
    return (
        <article className={style.themedArticlePage}>
            <div className={style.content}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
