import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { RenderOnAuthStateMixin } from '../_mixins';
import { OptionSetSingle } from '../../util-types';
import { ProcessedHtmlProps } from 'types/processed-html-props';

interface LegacyCall {
    phoneNumber?: string;
}

interface Options {
    chat: DefaultContactData;
    write: DefaultContactData;
    navoffice: DefaultContactData;
    aidcentral: DefaultContactData;
    custom: DefaultContactData;
    call: SharedContactInformationData & LegacyCall;
}

export type ChannelType = keyof Options;

export interface OpeningHour {
    status: string;
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
        hours: OpeningHour[];
    };
    specialOpeningHours?: {
        title?: string;
        text?: string;
        footNote?: string;
        validFrom: string;
        validTo: string;
        hours: OpeningHour[];
    };
}

export interface ContactOptionProps extends PartComponentProps {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: OptionSetSingle<Options>;
    } & RenderOnAuthStateMixin;
}
