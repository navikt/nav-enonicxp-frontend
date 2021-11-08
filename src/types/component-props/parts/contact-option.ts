import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';

export enum ChannelType {
    CHAT = 'chat',
    WRITE = 'write',
    CALL = 'call',
}

export interface SpecialOpeningHour {
    status: string;
    from: string;
    to: string;
    date: string;
}
export interface ContactData {
    title?: string;
    ingress?: string;
    phoneNumber?: string;
    channel: ChannelType;
    text?: string;
    regularOpeningHours?: {
        [key: string]: {
            from: string;
            to: string;
        };
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
            chat: ContactData;
            write: ContactData;
            call: ContactData;
        };
    } & RenderOnAuthStateMixin;
}
