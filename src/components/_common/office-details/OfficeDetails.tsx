import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { Reception } from '@navikt/nav-office-reception-info';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PhonePoster } from './phonePoster/PhonePoster';
import { OfficeInformation } from './officeInformation/OfficeInformation';
import { forceArray } from 'utils/arrays';

import styles from './OfficeDetails.module.scss';

export interface OfficeDetailsProps {
    officeData: OfficeDetailsData;
}

export const OfficeDetails = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageConfig();
    const { brukerkontakt } = officeData;
    const getOfficeTranslations = translator('office', language);

    const publikumsmottak = forceArray(brukerkontakt?.publikumsmottak);

    return (
        <div className={styles.wide}>
            <div
                className={classNames(styles.officeDetails, styles.pageContent)}
            >
                <Heading level="2" size="large" className={styles.header}>
                    {getOfficeTranslations('youFindUsHere')}
                </Heading>
                {publikumsmottak.length > 0 && (
                    <Reception
                        receptions={publikumsmottak}
                        language={language}
                    />
                )}
                <PhonePoster officeData={officeData} />
                <OfficeInformation officeData={officeData} />
            </div>
        </div>
    );
};
