import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficeBranchPageProps } from '../../../types/content-props/dynamic-page-props';
import { OfficePageHeader } from '../../_common/headers/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';
import { useRouter } from 'next/router';
import ErrorPage404 from 'pages/404';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const editorialPage = props.editorial;

    if (!editorialPage) {
        console.error(`No editorial page found for ${props.displayName}`);
    }

    /* This to be removed before pilot starts after easter */
    const router = useRouter();

    if (!router.route.includes('utkast')) {
        return <>Finnes ikke</>;
    }
    /* End */

    return (
        <div className={'officeBranchPage'}>
            <OfficePageHeader
                officeDetails={props.data}
                showTimeStamp={false}
            />
            <OfficeDetails officeData={props.data} />
            <div className={'content'}>
                {editorialPage && (
                    <ComponentMapper
                        componentProps={editorialPage.page}
                        pageProps={props}
                    />
                )}
            </div>
        </div>
    );
};
