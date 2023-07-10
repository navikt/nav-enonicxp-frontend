import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeEditorialPageProps } from 'types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import style from './OfficeEditorialPage.module.scss';

export const OfficeEditorialPage = (props: OfficeEditorialPageProps) => {
    return (
        <div className={style.officeEditorialPage}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
