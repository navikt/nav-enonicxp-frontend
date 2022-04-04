import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { SituationPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import style from './SituationPage.module.scss';

export const SituationPage = (props: SituationPageProps) => {
    return (
        <div className={style.situationPage}>
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
