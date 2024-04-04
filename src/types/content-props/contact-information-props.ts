import { ContentType, ContentCommonProps } from './_content-common';
import {
    ChatData,
    TelephoneData,
    WriteData,
} from 'components/parts/contact-option/ContactOptionPart';

export interface ContactInformationData {
    contactType: {
        telephone?: TelephoneData;
        write?: WriteData;
        chat?: ChatData;
    };
}

export type ContactInformationProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: ContactInformationData;
};
