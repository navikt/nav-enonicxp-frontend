import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficePageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

export const OfficePage = (props: OfficePageProps) => {
    return (
        <div className={'officePage'}>
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
