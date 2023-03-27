import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { Audience, RenderOnAuthStateMixin } from '../_mixins';
import { OptionSetSingle } from '../../util-types';
import { ProcessedHtmlProps } from 'types/processed-html-props';

interface LegacyCall {
    phoneNumber?: string;
}

interface LegacyWrite {
    ingress?: ProcessedHtmlProps;
    title?: string;
    url?: string;
}

interface Options {
    chat: DefaultContactData;
    write: SharedContactInformationData & LegacyWrite;
    navoffice: DefaultContactData;
    aidcentral: DefaultContactData;
    custom: DefaultContactData;
    call: SharedContactInformationData & LegacyCall;
}

export type ChannelType = keyof Options;

export interface OpeningHour {
    status: 'OPEN' | 'CLOSED';
    from: string;
    to: string;
    dayName?: string;
    date?: string;
}

export interface DefaultContactData {
    ingress?: ProcessedHtmlProps;
    title?: string;
    url?: string;
    icon?: string;
}

export interface TelephoneData {
    phoneNumber?: string;
    title?: string;
    text?: string;
    alertText?: string;
    regularOpeningHours?: {
        hours: OpeningHour[];
    };
    specialOpeningHours?: {
        title?: string;
        text?: string;
        validFrom: string;
        validTo: string;
        hours: OpeningHour[];
    };
    audience?: Audience;
}
export interface WriteData extends DefaultContactData {
    alertText?: string;
}
export interface ChatData extends Omit<DefaultContactData, 'url'> {
    alertText?: string;
}

export interface SharedContactInformationData extends DefaultContactData {
    sharedContactInformation: {
        _path: string;
        data: {
            contactType: {
                telephone?: TelephoneData;
                write?: WriteData;
            };
        };
    };
}

export interface WriteData {
    title?: string;
    url?: string;
    alertText?: string;
    ingress?: ProcessedHtmlProps;
}

export interface ContactOptionProps extends PartComponentProps {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: OptionSetSingle<Options>;
    } & RenderOnAuthStateMixin;
}
