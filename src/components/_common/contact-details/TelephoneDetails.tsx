import React from 'react';

import { CallOption } from '../contact-option/CallOption';
import { TelephoneData } from 'types/component-props/parts/contact-option';

export const TelephoneDetails = (props: TelephoneData) => {
    const {
        alertText,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
    } = props;

    return (
        <CallOption 
            alertText={alertText}
            ingress={text}
            phoneNumber={phoneNumber}
            regularOpeningHours={regularOpeningHours}
            specialOpeningHours={specialOpeningHours}
        />
    );
};
