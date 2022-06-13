import { TelephoneData } from 'types/component-props/parts/contact-option';
import { ContentType, CustomContentCommonProps } from './_content-common';

export interface ContactInformationData {
    contactType: {
        telephone?: TelephoneData;
    };
}

export interface ContactInformationProps extends CustomContentCommonProps {
    __typename: ContentType.ContactInformationPage;
    data: ContactInformationData;
}
