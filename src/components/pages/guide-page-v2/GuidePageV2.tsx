import React from 'react';
import { GuidePageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import style from './GuidePageV2.module.scss';

export const GuidePageV2 = (props: GuidePageProps) => {
    return (
        <article className={style.guidePage}>
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
