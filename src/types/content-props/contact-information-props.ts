import {
    WriteData,
    TelephoneData,
    ChatData,
} from 'types/component-props/parts/contact-option';
import { ContentType, ContentCommonProps } from './_content-common';

export interface ContactInformationData {
    contactType: {
        telephone?: TelephoneData;
        write?: WriteData;
        chat?: ChatData;
    };
}

export interface ContactInformationProps extends ContentCommonProps {
    type: ContentType.ContactInformationPage;
    data: ContactInformationData;
}
