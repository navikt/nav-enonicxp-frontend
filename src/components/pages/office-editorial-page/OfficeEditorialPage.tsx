import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeEditorialPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import styles from './OfficeEditorialPage.module.scss';

export const OfficeEditorialPage = (props: OfficeEditorialPageProps) => {
    return (
        <div className={styles.officeEditorialPage}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={styles.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
