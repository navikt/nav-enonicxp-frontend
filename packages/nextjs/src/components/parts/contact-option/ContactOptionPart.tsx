import React from 'react';
import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption/CallOption';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { WriteOption } from 'components/_common/contact-option/WriteOption/WriteOption';
import { usePageContentProps } from 'store/pageContext';
import { ChatOption } from 'components/_common/contact-option/ChatOption/ChatOption';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { DayName } from 'utils/datetime';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { AudienceOptions } from 'types/component-props/_mixins';
import { createTypeGuard } from 'types/_type-guards';

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

export type DefaultContactData = {
    ingress?: ProcessedHtmlProps;
    title?: string;
    url?: string;
    hideMoreLink?: boolean;
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
    hideMoreLink?: boolean;
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

export type ChannelType = Exclude<keyof PartConfigContactOption['contactOptions'], '_selected'>;

const editorHelpText = {
    call: 'Velg telefonnummer før denne kontaktkanalen kan vises. Alternativt vises gammel hardkodet telefon-informasjon.',
    write: 'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.',
    chat: 'Velg en "chat"-side før denne kontaktkanalen kan vises. Alternativt vises standard chat-tekstinnhold.',
} as const;

const isChannelWithSharedInfo = createTypeGuard(['call', 'write', 'chat'] as const);

export type PartConfigContactOption = {
    contactOptions: OptionSetSingle<{
        chat: DefaultContactData;
        write: DefaultContactData & LegacyWrite;
        navoffice: DefaultContactData;
        aidcentral: DefaultContactData;
        custom: DefaultContactData;
        call: DefaultContactData & LegacyCall;
    }>;
};

export const ContactOptionPart = ({ config }: PartComponentProps<PartType.ContactOption>) => {
    const pageProps = usePageContentProps();

    const channel = config?.contactOptions?._selected;
    if (!channel) {
        return <EditorHelp text={'Velg kontaktkanal fra listen til høyre'} />;
    }

    const audience = pageProps.data?.audience;

    const channelData = config.contactOptions[channel];

    if (!isChannelWithSharedInfo(channel)) {
        return <DefaultOption {...channelData} channel={channel} />;
    }

    const { sharedContactInformation, ingress } = channelData;

    if (!sharedContactInformation) {
        return pageProps.editorView === 'edit' ? (
            <EditorHelp text={editorHelpText[channel]} />
        ) : (
            <DefaultOption {...channelData} channel={channel} />
        );
    }

    switch (channel) {
        case 'write': {
            return (
                <WriteOption
                    {...sharedContactInformation.data.contactType.write}
                    ingress={ingress ?? sharedContactInformation.data.contactType.write?.ingress}
                />
            );
        }
        case 'chat': {
            return (
                <ChatOption
                    {...sharedContactInformation.data.contactType.chat}
                    ingress={ingress ?? sharedContactInformation.data.contactType.chat?.ingress}
                />
            );
        }
        case 'call': {
            return (
                <CallOption
                    {...sharedContactInformation.data.contactType.telephone}
                    ingress={ingress}
                    audience={audience}
                />
            );
        }
    }
};
