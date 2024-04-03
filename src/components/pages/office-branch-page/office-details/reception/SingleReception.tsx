import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ClockFillIcon, InformationSquareFillIcon, HouseFillIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import {
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from 'types/content-props/office-details-props';
import {
    officeDetailsFormatAddress,
    officeDetailsFormatAudienceReception,
    officeDetailsGetFutureOpeningExceptions,
} from 'components/pages/office-branch-page/office-details/utils';
import { OpeningHours } from './OpeningHours';
import { usePageContentProps } from 'store/pageContext';

import style from './SingleReception.module.scss';

export const SingleReception = (props: AudienceReception) => {
    const { language } = usePageContentProps();

    const getLabel = translator('office', language);

    const { address, adkomstbeskrivelse, openingHours, openingHoursExceptions } =
        officeDetailsFormatAudienceReception(props);

    const futureOpeningHoursExceptions =
        officeDetailsGetFutureOpeningExceptions(openingHoursExceptions);

    const hasOpeningHours =
        futureOpeningHoursExceptions.length > 0 || futureOpeningHoursExceptions.length > 0;

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
                {adkomstbeskrivelse && (
                    <BodyShort className={style.addressLine} size="small">
                        {adkomstbeskrivelse}
                    </BodyShort>
                )}
            </section>
            {openingHours.length > 0 && (
                <>
                    <Heading level="3" size="medium" spacing className={style.heading}>
                        <ClockFillIcon
                            aria-hidden="true"
                            className={classNames(style.headingIcon, style.iconClock)}
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
            {hasOpeningHours && (
                <div className={style.appointmentBookingInfo}>
                    <InformationSquareFillIcon className={style.iconInfo} aria-hidden="true" />
                    {getLabel('youCanMakeAppointment')}
                </div>
            )}
        </div>
    );
};
