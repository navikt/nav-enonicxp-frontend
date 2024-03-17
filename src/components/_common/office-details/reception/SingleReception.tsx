import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import {
    ClockFillIcon,
    InformationSquareFillIcon,
    HouseFillIcon,
} from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import {
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from 'types/content-props/office-details-props';
import { formatAddress } from '../utils';
import { OpeningHours } from './OpeningHours';

import style from './SingleReception.module.scss';

type FormattedAudienceReception = {
    address: string;
    adkomstbeskrivelse: string;
    openingHours: OpeningHoursProps[];
    openingHoursExceptions: OpeningHoursProps[];
    place?: string;
};

export const SingleReception = (props: AudienceReception) => {
    const { language } = usePageConfig();

    const getLabel = translator('office', language);
    const audienceReception = formatAudienceReception(props);

    const {
        address,
        adkomstbeskrivelse,
        openingHours,
        openingHoursExceptions,
    } = audienceReception;

    const todaysDate: string = new Date().toISOString().slice(0, 10);
    const futureOpeningHoursExceptions = openingHoursExceptions
        .filter((exception) => exception.dato && exception.dato >= todaysDate)
        .sort((a, b) => {
            const dateA = new Date(a.dato).getTime();
            const dateB = new Date(b.dato).getTime();
            return dateA - dateB;
        });

    return (
        <div className={style.singleReception}>
            <Heading level="3" size="medium" spacing className={style.heading}>
                <HouseFillIcon
                    aria-hidden="true"
                    className={classNames(style.headingIcon, style.iconPlace)}
                />
                {getLabel('address')}
            </Heading>
            <section className={style.address}>
                <BodyShort className={style.addressLine}>{address}</BodyShort>
                <BodyShort className={style.addressLine} size="small">
                    {adkomstbeskrivelse}
                </BodyShort>
            </section>

            {openingHours.length > 0 && (
                <>
                    <Heading
                        level="3"
                        size="medium"
                        spacing
                        className={style.heading}
                    >
                        <ClockFillIcon
                            aria-hidden="true"
                            className={classNames(
                                style.headingIcon,
                                style.iconClock
                            )}
                        />
                        {getLabel('openingHoursWithoutAppointment')}
                    </Heading>
                    <OpeningHours openingHours={openingHours} />
                </>
            )}
            {futureOpeningHoursExceptions.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing>
                        {getLabel('specialOpeningHours')}
                    </Heading>
                    <OpeningHours openingHours={futureOpeningHoursExceptions} />
                </>
            )}
            <div className={style.appointmentBookingInfo}>
                <InformationSquareFillIcon
                    className={style.iconInfo}
                    aria-hidden="true"
                />
                {getLabel('youCanMakeAppointment')}
            </div>
        </div>
    );
};

const formatAudienceReception = (
    audienceReception: AudienceReception
): FormattedAudienceReception => {
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
            audienceReception.besoeksadresse?.poststed,
        openingHoursExceptions: aapningstider.exceptions,
        openingHours: aapningstider.regular.sort(sortOpeningHours),
        adkomstbeskrivelse: audienceReception.adkomstbeskrivelse,
    };
};
