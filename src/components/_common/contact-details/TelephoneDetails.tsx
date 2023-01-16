import React from 'react';

import { CallOption } from '../contact-option/CallOption';
import { TelephoneData } from 'types/component-props/parts/contact-option';
import { Audience } from 'types/component-props/_mixins';

export const TelephoneDetails = (props: TelephoneData) => {
    const {
        title,
        alertText,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
    } = props;

    return (
        <CallOption
            title={title}
            alertText={alertText}
            ingress={text}
            phoneNumber={phoneNumber}
            regularOpeningHours={regularOpeningHours}
            specialOpeningHours={specialOpeningHours}
        />
    );
};
