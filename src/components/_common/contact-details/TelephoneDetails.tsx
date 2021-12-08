import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Heading, BodyLong, Alert } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import { BEM, classNames } from 'utils/classnames';

import { TelephoneData } from 'types/component-props/parts/contact-option';
import {
    mergeOpeningHours,
    getThisWeeksOpeningHours,
    parsePhoneNumber,
} from './contactHelpers';

import { SpecialOpeningHours } from './partials/specialOpeningHours';
import { CallingCosts } from './partials/callingCosts';
import { RegularOpeningHours } from './partials/regularOpeningHours';
import { TodaysOpeningHour } from './partials/todaysOpeningHour';

import './TelephoneDetails.less';

const bem = BEM('telephoneDetails');

export const TelephoneDetails = (props: TelephoneData) => {
    const {
        alertText,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
        title,
    } = props;

    const { language } = usePageConfig();

    // Misc translations

    const getContactTranslations = translator('contactPoint', language);

    const allOpeningHours = mergeOpeningHours(
        regularOpeningHours?.hours,
        specialOpeningHours?.hours
    );

    const thisWeeksOpeningHours = getThisWeeksOpeningHours(allOpeningHours);
    const callLabel = getContactTranslations('call');

    return (
        <>
            <Heading level="1" size="large" spacing>
                {title}
            </Heading>
            <LenkeBase
                className={classNames(bem('phoneNumber'))}
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
            >
                {callLabel['title']} {parsePhoneNumber(phoneNumber, language)}
            </LenkeBase>
            {alertText && (
                <Alert
                    size="small"
                    variant="warning"
                    className={classNames(bem('alertText'))}
                >
                    {alertText}
                </Alert>
            )}
            <div className={bem('text')}>
                <>
                    <BodyLong spacing>{text}</BodyLong>
                    <TodaysOpeningHour openingHours={thisWeeksOpeningHours} />
                </>
            </div>
            <SpecialOpeningHours specialOpeningHours={specialOpeningHours} />
            <RegularOpeningHours regularOpeningHours={thisWeeksOpeningHours} />
            <CallingCosts />
        </>
    );
};
