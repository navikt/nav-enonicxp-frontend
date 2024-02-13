import { BodyShort, Heading } from '@navikt/ds-react';
import {
    ClockFillIcon,
    InformationSquareFillIcon,
    HouseFillIcon,
} from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { translator } from './utils/translations';
import {
    AudienceReception,
    Language,
    OpeningHours as OpeningHoursProps,
} from './utils/types';
import { formatAddress } from './utils/utils';
import { OpeningHours } from './OpeningHours';

import styles from './SingleReception.module.scss';

interface FormattedAudienceReception {
    address: string;
    adkomstbeskrivelse: string;
    openingHours: OpeningHoursProps[];
    openingHoursExceptions: OpeningHoursProps[];
    place: string;
}

interface SingleReceptionProps extends AudienceReception {
    language: Language;
}

export const SingleReception = (props: SingleReceptionProps) => {
    const { language } = props;
    const getLabel = translator('office', language);

    console.log('language', language);

    const dagArr: string[] = [
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
    ];

    const sortOpeningHours = (a: OpeningHoursProps, b: OpeningHoursProps) => {
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

    const { address, adkomstbeskrivelse, openingHours } =
        formatAudienceReception(props);

    let { openingHoursExceptions } = formatAudienceReception(props);

    const todaysDate: string = new Date().toISOString().slice(0, 10);
    const futureOpeningHoursExceptions = openingHoursExceptions
        .filter((exception) => {
            const openingHoursExceptionDate: string = exception.dato;
            return openingHoursExceptionDate >= todaysDate;
        })
        .sort((a, b) => {
            const dateA = new Date(a.dato).getTime();
            const dateB = new Date(b.dato).getTime();
            return dateA - dateB;
        });

    return (
        <div className={styles.singleReception}>
            <Heading level="3" size="medium" spacing className={styles.heading}>
                <HouseFillIcon
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
                        <ClockFillIcon
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
                        language={language}
                    />
                </>
            )}
            {futureOpeningHoursExceptions.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing>
                        {getLabel('specialOpeningHours')}
                    </Heading>
                    <OpeningHours
                        openingHours={futureOpeningHoursExceptions}
                        language={language}
                    />
                </>
            )}
            <div className={styles.appointmentBookingInfo}>
                <InformationSquareFillIcon
                    className={styles.iconInfo}
                    aria-hidden="true"
                />
                {getLabel('youCanMakeAppointment')}
            </div>
        </div>
    );
};
