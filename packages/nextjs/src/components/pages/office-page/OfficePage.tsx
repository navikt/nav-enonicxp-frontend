import React from 'react';
import { logger } from '@/shared/logger';
import { ComponentMapper } from 'components/ComponentMapper';
import { OfficePageProps } from 'types/content-props/dynamic-page-props';
import { classNames } from 'utils/classnames';

import { OfficePageHeader } from 'components/pages/office-page/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/pages/office-page/officeDetails/OfficeDetails';

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
        <article className={styles.officePage}>
            {officeNorgData && <OfficePageHeader officeDetails={officeNorgData} />}
            {officeNorgData && <OfficeDetails officeData={officeNorgData} />}
            <div className={classNames(styles.content, styles.pageContent)}>
                <ComponentMapper componentProps={page} pageProps={props} />
            </div>
        </article>
    );
};
