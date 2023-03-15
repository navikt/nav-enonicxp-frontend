import { ClockFilled, Information, PlaceFilled } from '@navikt/ds-icons';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import classNames from 'classnames';
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
    adkomstbeskrivelse: string;
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

                acc.exceptions.push({
                    ...elem,
                    isoDate,
                    dato: elem.dato,
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

    console.log(aapningstider);

    return {
        address: formatAddress(audienceReception.besoeksadresse, true),
        place:
            audienceReception.stedsbeskrivelse ||
            audienceReception.besoeksadresse.poststed,
        openingHoursExceptions: aapningstider.exceptions,
        openingHours: aapningstider.regular.sort(sortOpeningHours),
        adkomstbeskrivelse: audienceReception.adkomstbeskrivelse,
    };
};

export const SingleReception = (props: AudienceReception) => {
    const { language } = usePageConfig();
    const {
        address,
        openingHours,
        openingHoursExceptions,
        adkomstbeskrivelse,
    } = formatAudienceReception(props);

    const getLabel = translator('office', language);
    return (
        <div className={styles.singleReception}>
            <Heading level="2" size="medium" spacing className={styles.heading}>
                <PlaceFilled
                    aria-hidden="true"
                    className={classNames(styles.headingIcon, styles.iconPlace)}
                />
                {getLabel('address')}
            </Heading>
            <section className={styles.address}>
                <BodyShort className={styles.addressLine}>{address}</BodyShort>
                <BodyShort className={styles.addressLine} size="small">
                    {adkomstbeskrivelse}
                </BodyShort>
            </section>
            {openingHours.length > 0 && (
                <>
                    <Heading
                        level="3"
                        size="medium"
                        spacing
                        className={styles.heading}
                    >
                        <ClockFilled
                            aria-hidden="true"
                            className={classNames(
                                styles.headingIcon,
                                styles.iconClock
                            )}
                        />
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
            <div className={styles.appointmentBookingInfo}>
                <Information className={styles.appointmentIcon} />
                {getLabel('youCanMakeAppointment')}
            </div>
        </div>
    );
};
