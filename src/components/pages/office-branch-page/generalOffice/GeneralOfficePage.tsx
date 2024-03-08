import React from 'react';
import { ComponentMapper } from '../../../ComponentMapper';
import { OfficeBranchPageProps } from 'types/content-props/dynamic-page-props';
import { OfficePageHeader } from '../../../_common/headers/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';
import { classNames } from 'utils/classnames';

import styles from '../OfficeBranchPage.module.scss';

export const GeneralOfficePage = (props: OfficeBranchPageProps) => {
    const editorialPage = props.editorial;

    if (!editorialPage) {
        console.error(`No editorial page found for ${props.displayName}`);
    }

    return (
        <div className={styles.officeBranchPage}>
            <OfficePageHeader
                officeDetails={props.data}
                showTimeStamp={false}
            />
            <OfficeDetails officeData={props.data} />
            <div className={classNames(styles.content, styles.pageContent)}>
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
