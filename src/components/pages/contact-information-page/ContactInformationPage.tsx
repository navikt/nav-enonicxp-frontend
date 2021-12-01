import React from 'react';
import { TelephoneDetails } from 'components/_common/contact-details/TelephoneDetails';

import { classNames, BEM } from 'utils/classnames';

import './ContactInformationPage.less';

const bem = BEM('contactInformationPage');

export const ContactInformationPage = (props: any) => {
    const { data } = props;
    const { contactType } = data;

    return (
        <div className={classNames(bem())}>
            <div className={classNames(bem('content'))}>
                <TelephoneDetails {...contactType.telephone} />
            </div>
        </div>
    );
};
