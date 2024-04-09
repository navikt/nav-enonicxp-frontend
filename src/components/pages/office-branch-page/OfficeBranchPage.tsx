import React from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { OfficeBranchPageProps } from 'types/content-props/dynamic-page-props';
import { classNames } from 'utils/classnames';
import { logger } from 'srcCommon/logger';
import { OfficePageHeader } from './office-page-header/OfficePageHeader';
import { OfficeDetails } from './office-details/OfficeDetails';

import styles from './OfficeBranchPage.module.scss';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const editorialPage = props.editorial;

    if (!editorialPage) {
        logger.error(`No editorial page found for ${props.displayName}`);
    }

    return (
        <div className={styles.officeBranchPage}>
            <OfficePageHeader officeDetails={props.data} showTimeStamp={false} />
            <OfficeDetails officeData={props.data} />
            <div className={classNames(styles.content, styles.pageContent)}>
                {editorialPage && (
                    <ComponentMapper componentProps={editorialPage.page} pageProps={props} />
                )}
            </div>
        </div>
    );
};
