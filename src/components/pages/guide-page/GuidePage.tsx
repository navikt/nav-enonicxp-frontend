import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { GuidePageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import style from './GuidePage.module.scss';

export const GuidePage = (props: GuidePageProps) => {
    return (
        <div className={style.guidePage}>
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
