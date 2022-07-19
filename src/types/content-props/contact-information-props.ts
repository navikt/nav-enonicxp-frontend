import {
    DefaultContactData,
    TelephoneData,
} from 'types/component-props/parts/contact-option';
import { ContentType, ContentCommonProps } from './_content-common';

export interface ContactInformationData {
    contactType: {
        telephone?: TelephoneData;
        write?: DefaultContactData;
    };
}

export interface ContactInformationProps extends ContentCommonProps {
    __typename: ContentType.ContactInformationPage;
    data: ContactInformationData;
}
