import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OfficePageProps } from 'types/content-props/dynamic-page-props';
import { OfficePageHeader } from '../../_common/headers/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';
import { classNames } from 'utils/classnames';

import styles from './OfficePage.module.scss';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const OfficePage = (props: OfficePageProps) => {
    const { officeData } = props.data;
    return (
        <div className={styles.officeBranchPage}>
            {officeData && (
                <OfficePageHeader
                    officeDetails={officeData}
                    showTimeStamp={false}
                />
            )}
            {officeData && <OfficeDetails officeData={officeData} />}
            <div className={classNames(styles.content, styles.pageContent)}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
