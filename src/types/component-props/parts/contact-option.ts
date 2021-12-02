import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';

export enum ChannelType {
    CHAT = 'chat',
    WRITE = 'write',
    CALL = 'call',
}

export interface RegularOpeningHour {
    status: string;
    from: string;
    to: string;
    dayName: string;
}
export interface SpecialOpeningHour {
    status: string;
    from: string;
    to: string;
    date: string;
}

export interface DefaultContactData {
    ingress?: string;
    title?: string;
    url?: string;
}

export interface SharedContactInformationData extends DefaultContactData {
    sharedContactInformation: {
        _path: string;
        data: {
            contactType: {
                telephone?: TelephoneData;
            };
        };
    };
}
export interface TelephoneData {
    phoneNumber?: string;
    title?: string;
    text?: string;
    alertText?: string;
    regularOpeningHours?: {
        hours: RegularOpeningHour[];
    };
    specialOpeningHours?: {
        title?: string;
        text?: string;
        footNote?: string;
        validFrom: string;
        validTo: string;
        hours: SpecialOpeningHour[];
    };
}

export interface ContactOptionProps extends PartComponentProps {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: {
            _selected: ChannelType;
        } & {
            chat: DefaultContactData;
            write: DefaultContactData;
            call: SharedContactInformationData;
        };
    } & RenderOnAuthStateMixin;
}
