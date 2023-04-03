import { Heading } from '@navikt/ds-react';
import { PlaceFilled } from '@navikt/ds-icons';
import classNames from 'classnames';
import { translator } from 'translations';
import { Reception } from './reception/Reception';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PhonePoster } from './phonePoster/PhonePoster';
import { OfficeInformation } from './officeInformation/OfficeInformation';

import styles from './OfficeDetails.module.scss';
import { forceArray } from 'utils/arrays';
export interface OfficeDetailsProps {
    officeData: OfficeDetailsData;
}

export const OfficeDetails = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageConfig();
    const { brukerkontakt } = officeData;
    const getOfficeTranslations = translator('office', language);

    const publikumsmottak = forceArray(brukerkontakt.publikumsmottak);

    return (
        <div className={styles.wide}>
            <div
                className={classNames(
                    styles.officeDetails,
                    'region__pageContent'
                )}
            >
                <Heading level="2" size="large" className={styles.header}>
                    <div className={styles.placeIcon}>
                        <PlaceFilled aria-hidden="true" />
                    </div>
                    {getOfficeTranslations('youFindUsHere')}
                </Heading>
                {publikumsmottak.length > 0 && (
                    <Reception receptions={publikumsmottak} />
                )}
                <PhonePoster officeData={officeData} />
                <OfficeInformation officeData={officeData} />
            </div>
        </div>
    );
};
