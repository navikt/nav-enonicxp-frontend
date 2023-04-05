import { ClockFilled, Information, PlaceFilled } from '@navikt/ds-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import {
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from 'types/content-props/office-details-props';
import { formatAddress } from '../utils';
import { OpeningHours } from './OpeningHours';

import styles from './SingleReception.module.scss';

interface FormattedAudienceReception {
    address: string;
    adkomstbeskrivelse: string;
    openingHours: OpeningHoursProps[];
    openingHoursExceptions: OpeningHoursProps[];
    place: string;
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
    audienceReception: AudienceReception
): FormattedAudienceReception | null => {
    if (!audienceReception) {
        return null;
    }

    const aapningstider = audienceReception.aapningstider.reduce(
        (acc, elem) => {
            if (elem.dato) {
                acc.exceptions.push(elem);
            } else {
                acc.regular.push(elem);
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
        adkomstbeskrivelse: audienceReception.adkomstbeskrivelse,
    };
};

export const SingleReception = (props: AudienceReception) => {
    const { language } = usePageConfig();
    const {
        address,
        adkomstbeskrivelse,
        openingHours,
        openingHoursExceptions,
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
                    <OpeningHours openingHours={openingHours} />
                </>
            )}
            {openingHoursExceptions.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing>
                        {getLabel('specialOpeningHours')}
                    </Heading>
                    <OpeningHours openingHours={openingHoursExceptions} />
                </>
            )}
            <div className={styles.appointmentBookingInfo}>
                <Information
                    className={styles.appointmentIcon}
                    aria-hidden="true"
                />
                {getLabel('youCanMakeAppointment')}
            </div>
        </div>
    );
};
