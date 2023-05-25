import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { AudienceProps, RenderOnAuthStateMixin } from '../_mixins';
import { OptionSetSingle } from '../../util-types';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type OpeningHourRegularRaw =
    | {
          status: 'CLOSED';
          dayName: string;
      }
    | {
          status: 'OPEN';
          dayName: string;
          from: string;
          to: string;
      };

export type OpeningHourSpecialRaw =
    | {
          status: 'CLOSED';
          date: string;
      }
    | {
          status: 'OPEN';
          from: string;
          to: string;
          date: string;
      };

export type OpeningHourRaw = OpeningHourRegularRaw | OpeningHourSpecialRaw;

export type RegularOpeningHours = {
    hours: OpeningHourRegularRaw[];
};

export type SpecialOpeningHours = {
    validFrom: string;
    validTo: string;
    hours?: OpeningHourSpecialRaw[];
};

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
    regularOpeningHours?: RegularOpeningHours;
    specialOpeningHours?: SpecialOpeningHours;
    audience?: AudienceProps;
}

export interface WriteData extends DefaultContactData {
    alertText?: string;
}

export interface ChatData extends Omit<DefaultContactData, 'url'> {
    alertText?: string;
    regularOpeningHours?: RegularOpeningHours;
    specialOpeningHours?: SpecialOpeningHours;
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
