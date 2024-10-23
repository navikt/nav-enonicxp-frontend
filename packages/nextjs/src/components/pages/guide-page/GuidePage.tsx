import React from 'react';
import { GuidePageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';

import style from './GuidePage.module.scss';

export const GuidePage = (props: GuidePageProps) => {
    return (
        <article className={style.guidePage}>
            <div className={style.content}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
