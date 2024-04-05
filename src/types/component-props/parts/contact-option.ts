import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { AudienceOptions, RenderOnAuthStateMixin } from 'types/component-props/_mixins';
import { OptionSetSingle } from 'types/util-types';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { DayName } from 'utils/datetime';

// TODO: Rewrite this for easier type narrowing

export type OpeningHourRegularRaw =
    | {
          status: 'CLOSED';
          dayName: DayName;
      }
    | {
          status: 'OPEN';
          dayName: DayName;
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
    overrideText?: string;
    validFrom: string;
    validTo: string;
    hours?: OpeningHourSpecialRaw[];
};

type LegacyCall = {
    phoneNumber?: string;
};

type LegacyWrite = {
    ingress?: ProcessedHtmlProps;
    title?: string;
    url?: string;
};

type Options = {
    chat: DefaultContactData;
    write: DefaultContactData & LegacyWrite;
    navoffice: DefaultContactData;
    aidcentral: DefaultContactData;
    custom: DefaultContactData;
    call: DefaultContactData & LegacyCall;
};

export type ChannelType = keyof Options;

export type DefaultContactData = {
    ingress?: ProcessedHtmlProps;
    title?: string;
    url?: string;
    icon?: 'facebook' | 'linkedin';
    sharedContactInformation?: {
        _path: string;
        data: {
            contactType: {
                telephone?: TelephoneData;
                write?: WriteData;
                chat?: ChatData;
            };
        };
    };
};

export type TelephoneData = {
    phoneNumber?: string;
    title?: string;
    text?: string;
    alertText?: string;
    regularOpeningHours?: RegularOpeningHours;
    specialOpeningHours?: SpecialOpeningHours;
    audience?: AudienceOptions;
};

export type ChatData = Omit<DefaultContactData, 'url'> & {
    alertText?: string;
    regularOpeningHours?: RegularOpeningHours;
    specialOpeningHours?: SpecialOpeningHours;
};

export type WriteData = {
    title?: string;
    url?: string;
    alertText?: string;
    ingress?: ProcessedHtmlProps;
};

export type ContactOptionProps = PartComponentProps & {
    descriptor: PartType.ContactOption;
    config: {
        contactOptions: OptionSetSingle<Options>;
    } & RenderOnAuthStateMixin;
};
