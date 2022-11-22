import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import {
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from 'types/content-props/office-details-props';
import { formatDate } from 'utils/datetime';
import { formatAddress } from '../utils';
import { OpeningHours } from './OpeningHours';

import styles from './SingleReception.module.scss';

interface FormattedAudienceReception {
    address: string;
    place: string;
    openingHoursExceptions: OpeningHoursProps[];
    openingHours: OpeningHoursProps[];
}

const sortOpeningHours = (a: OpeningHoursProps, b: OpeningHoursProps) => {
    const dagArr: string[] = [
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
    ];
    return dagArr.indexOf(a.dag) - dagArr.indexOf(b.dag);
};

const formatAudienceReception = (
    audienceReception: AudienceReception,
    language: string = 'no'
): FormattedAudienceReception | null => {
    if (!audienceReception) {
        return null;
    }

    const aapningstider = audienceReception.aapningstider.reduce(
        (acc, elem) => {
            if (elem.dato) {
                const isoDate = elem.dato;
                const dato = formatDate(elem.dato, language);

                acc.exceptions.push({
                    ...elem,
                    isoDate,
                    dato,
                });
            } else {
                acc.regular.push({
                    ...elem,
                });
            }
            return acc;
        },
        {
            regular: [],
            exceptions: [],
        }
    );

    return {
        address: formatAddress(audienceReception.besoeksadresse, true),
        place:
            audienceReception.stedsbeskrivelse ||
            audienceReception.besoeksadresse.poststed,
        openingHoursExceptions: aapningstider.exceptions,
        openingHours: aapningstider.regular.sort(sortOpeningHours),
    };
};

export const SingleReception = (props: AudienceReception) => {
    const { language } = usePageConfig();
    const { address, openingHours, openingHoursExceptions } =
        formatAudienceReception(props);

    const getLabel = translator('office', language);
    return (
        <div className={styles.singleReception}>
            <Heading level="2" size="medium" spacing>
                {getLabel('address')}
            </Heading>
            <BodyShort className={styles.address}>{address}</BodyShort>

            {/* opening hours */}
            {openingHours.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing>
                        {getLabel('openingHoursWithoutAppointment')}
                    </Heading>
                    <OpeningHours
                        openingHours={openingHours}
                        closedLabel={getLabel('closed')}
                        appointmentOnlyLabel={getLabel('appointmentOnly')}
                        language={language}
                    />
                </>
            )}
            {/* exceptions in opening hours */}
            {openingHoursExceptions.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing>
                        {getLabel('specialOpeningHours')}
                    </Heading>
                    <OpeningHours
                        openingHours={openingHoursExceptions}
                        closedLabel={getLabel('closed')}
                        appointmentOnlyLabel={getLabel('appointmentOnly')}
                        language={language}
                    />
                </>
            )}
            <Alert variant="info" className={styles.appointmentBookingInfo}>
                {getLabel('youCanMakeAppointment')}
            </Alert>
        </div>
    );
};
