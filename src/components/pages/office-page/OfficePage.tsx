import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { OfficePageProps } from 'types/content-props/dynamic-page-props';
import { classNames } from 'utils/classnames';

import { OfficePageHeader } from 'components/pages/office-branch-page/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/pages/office-branch-page/office-details/OfficeDetails';

import styles from './OfficePage.module.scss';

export const OfficePage = (props: OfficePageProps) => {
    const officeNorgData = props.data.officeNorgData.data;

    return (
        <div className={styles.officeBranchPage}>
            {officeNorgData && (
                <OfficePageHeader officeDetails={officeNorgData} showTimeStamp={false} />
            )}
            {officeNorgData && <OfficeDetails officeData={officeNorgData} />}
            <div className={classNames(styles.content, styles.pageContent)}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </div>
    );
};
