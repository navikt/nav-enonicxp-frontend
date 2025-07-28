import {
    ChatData,
    TelephoneData,
    WriteData,
} from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
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
