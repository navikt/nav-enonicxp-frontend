import React from 'react';
import { logger } from '@/shared/logger';
import { ComponentMapper } from 'components/ComponentMapper';
import { OfficePageProps } from 'types/content-props/dynamic-page-props';
import { classNames } from 'utils/classnames';
import { OfficePageHeader } from 'components/pages/office-page/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/pages/office-page/officeDetails/OfficeDetails';
import { LinkedIn } from './linkedIn/LinkedIn';
import { isUnitOfficeType, shouldUseOfficeEditorialPage } from './officePageUtils';

import styles from './OfficePage.module.scss';

export const OfficePage = (props: OfficePageProps) => {
    const officeNorgData = props.data.officeNorgData.data;

    if (!officeNorgData) {
        logger.error('No office data exists for this office page');
        return null;
    }

    const useEditorialPage = shouldUseOfficeEditorialPage(
        officeNorgData.type,
        props.data.useUnitEditorialPage
    );
    const shouldRenderPageContent = useEditorialPage || officeNorgData.type !== 'REDAKSJONELT';
    const title = props.data.title?.trim() || officeNorgData.navn?.trim() || props.displayName;
    const editorialPage = props.editorial;
    const isUnit = isUnitOfficeType(officeNorgData.type, props.data.useUnitEditorialPage);
    const location = officeNorgData.beliggenhet;
    const locationLabel =
        officeNorgData.type === 'REDAKSJONELT' && location && 'locationLabel' in location
            ? location.locationLabel?.trim()
            : undefined;

    if (useEditorialPage && !editorialPage) {
        logger.error(`No editorial page found for office branch ${props.displayName}`);
    }

    const page = useEditorialPage ? editorialPage?.page : props.page;

    return (
        <article className={styles.officePage}>
            <OfficePageHeader title={title} officeDetails={officeNorgData} />
            <OfficeDetails
                officeData={officeNorgData}
                hidePhoneInformation={isUnit && officeNorgData.hidePhoneInformation}
                isUnit={isUnit}
                locationLabel={locationLabel}
            />

            {shouldRenderPageContent && page && (
                <div className={classNames(styles.content, styles.pageContent)}>
                    <ComponentMapper componentProps={page} pageProps={props} />
                </div>
            )}

            {props.data.linkedin && officeNorgData.type === 'ALS' && (
                <LinkedIn text={props.data.linkedin} />
            )}
        </article>
    );
};
