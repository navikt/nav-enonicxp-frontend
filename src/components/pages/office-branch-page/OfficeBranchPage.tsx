import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeBranchPageProps } from '../../../types/content-props/dynamic-page-props';
import { OfficePageHeader } from '../../_common/headers/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const editorialPage = props.editorial;

    console.log(props);

    return (
        <div className={'officeBranchPage'}>
            <OfficePageHeader contentProps={props} showTimeStamp={false} />
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
