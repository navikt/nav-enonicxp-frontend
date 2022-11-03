import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeBranchPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const editorialPage = props.editorial;

    return (
        <div className={'officeBranchPage'}>
            <ThemedPageHeader
                contentProps={editorialPage}
                showTimeStamp={false}
            />
            <OfficeDetails officeData={props.data} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={editorialPage.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
