import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { OfficePageProps } from 'types/content-props/dynamic-page-props';
import { classNames } from 'utils/classnames';
import { logger } from 'srcCommon/logger';

import { OfficePageHeader } from 'components/pages/office-page/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/pages/office-page/office-details/OfficeDetails';

import styles from './OfficePage.module.scss';

export const OfficePage = (props: OfficePageProps) => {
    const officeNorgData = props.data.officeNorgData.data;
    const isOfficeBranch = officeNorgData.type === 'LOKAL';
    const editorialPage = props.editorial;

    if (!officeNorgData) {
        logger.error('No office data exists for this office page');
        return null;
    }

    if (isOfficeBranch && !editorialPage) {
        logger.error(`No editorial page found for office branch ${props.displayName}`);
        return null;
    }

    const page = isOfficeBranch && editorialPage ? editorialPage.page : props.page;

    return (
        <div className={styles.officePage}>
            {officeNorgData && (
                <OfficePageHeader officeDetails={officeNorgData} showTimeStamp={false} />
            )}
            {officeNorgData && <OfficeDetails officeData={officeNorgData} />}
            <div className={classNames(styles.content, styles.pageContent)}>
                <ComponentMapper componentProps={page} pageProps={props} />
            </div>
        </div>
    );
};
