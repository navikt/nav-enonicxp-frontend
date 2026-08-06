import { Heading } from '@navikt/ds-react';
import { Reception } from '@navikt/nav-office-reception-info';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { usePageContentProps } from 'store/pageContext';
import { forceArray } from 'utils/arrays';
import { PhonePoster } from './phonePoster/PhonePoster';
import { Kontaktskjema } from './kontaktskjema/Kontaktskjema';
import { OfficeInformation } from './officeInformation/OfficeInformation';

import styles from './OfficeDetails.module.scss';

export interface OfficeDetailsProps {
    officeData: OfficeDetailsData;
    showApplicationFormLinks?: boolean;
}

export const OfficeDetails = ({ officeData, showApplicationFormLinks }: OfficeDetailsProps) => {
    const { language } = usePageContentProps();
    const { brukerkontakt } = officeData;
    const getOfficeTranslations = translator('office', language);

    const publikumsmottak = forceArray(brukerkontakt?.publikumsmottak);
    const hasReception = publikumsmottak.length > 0;

    return (
        <div className={styles.wide}>
            <div className={classNames(styles.officeDetails, styles.pageContent)}>
                <Heading level="2" size="large">
                    {getOfficeTranslations(hasReception ? 'youFindUsHere' : 'contactUs')}
                </Heading>
                {hasReception && (
                    <Reception
                        receptions={publikumsmottak}
                        officeType={officeData.type}
                        language={language}
                    />
                )}
                <PhonePoster officeData={officeData} />
                <Kontaktskjema
                    officeData={officeData}
                    showApplicationFormLinks={showApplicationFormLinks}
                />
                <OfficeInformation officeData={officeData} />
            </div>
        </div>
    );
};
