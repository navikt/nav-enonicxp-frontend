import {
    ChatData,
    TelephoneData,
    WriteData,
} from 'components/parts/contact-option/ContactOptionPart';
import { ContentType, ContentCommonProps } from './_content-common';

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
