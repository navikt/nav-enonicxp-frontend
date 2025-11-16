import { BodyLong, Heading } from '@navikt/ds-react';
import { Reception } from '@navikt/nav-office-reception-info';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { usePageContentProps } from 'store/pageContext';
import { forceArray } from 'utils/arrays';
import { PhonePoster } from './phonePoster/PhonePoster';
import { OfficeInformation } from './officeInformation/OfficeInformation';

import styles from './OfficeDetails.module.scss';

export interface OfficeDetailsProps {
    officeData: OfficeDetailsData;
}

export const OfficeDetails = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageContentProps();
    const { brukerkontakt } = officeData;
    const getOfficeTranslations = translator('office', language);

    const publikumsmottak = forceArray(brukerkontakt?.publikumsmottak);

    return (
        <div className={styles.wide}>
            <div className={classNames(styles.officeDetails, styles.pageContent)}>
                <Heading level="2" size="large" className={styles.header}>
                    {getOfficeTranslations('youFindUsHere')}
                </Heading>
                {publikumsmottak.length > 0 && (
                    <Reception
                        receptions={publikumsmottak}
                        officeType={officeData.type}
                        language={language}
                    />
                )}
                <PhonePoster officeData={officeData} />
                {/* {props.data.linkedin && ( //Sjekk også på om type HMS eventuelt? */}
                <div>
                    <Heading level="2" size="medium">
                        Kontaktskjema
                    </Heading>
                    <BodyLong>
                        Du kan også skrive til oss hvis du ønsker hjelp til å rekruttere eller
                        inkludere arbeidstakere og forebygge sykefravær.
                    </BodyLong>
                </div>
                {/* )} */}
                <OfficeInformation officeData={officeData} />
            </div>
        </div>
    );
};
