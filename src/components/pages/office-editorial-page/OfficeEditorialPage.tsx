import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeEditorialPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

export const OfficeEditorialPage = (props: OfficeEditorialPageProps) => {
    return (
        <div className={'officeEditorialPage'}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
