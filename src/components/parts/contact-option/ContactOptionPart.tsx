import React from 'react';
import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import {
    ChannelType,
    ContactOptionProps,
} from 'types/component-props/parts/contact-option';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { WriteOption } from 'components/_common/contact-option/WriteOption';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ChatOption } from 'components/_common/contact-option/ChatOption';

type ChannelWithSharedInfo = Extract<ChannelType, 'call' | 'write' | 'chat'>;

const editorHelpText: Record<ChannelWithSharedInfo, string> = {
    call: 'Velg telefonnummer før denne kontaktkanalen kan vises.  Alternativt vises gammel hardkodet telefon-informasjon.',
    write: 'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.',
    chat: 'Velg en "chat"-side før denne kontaktkanalen kan vises. Alternativt vises standard chat-tekstinnhold.',
};

const channelsWithSharedInfo: ReadonlySet<ChannelType> = new Set([
    'call',
    'write',
    'chat',
]);

const isChannelWithSharedInfo = (
    channel: ChannelType
): channel is ChannelWithSharedInfo => channelsWithSharedInfo.has(channel);

export const ContactOptionPart = ({
    config,
    pageProps,
}: ContactOptionProps) => {
    const { pageConfig } = usePageConfig();

    const channel = config?.contactOptions?._selected;
    if (!channel) {
        return <EditorHelp text={'Velg kontaktkanal fra listen til høyre'} />;
    }

    const { audience } = pageProps.data;

    const channelData = config.contactOptions[channel];

    if (!isChannelWithSharedInfo(channel)) {
        return <DefaultOption {...channelData} channel={channel} />;
    }

    const { sharedContactInformation, ingress } = channelData;

    if (!sharedContactInformation) {
        return pageConfig.editorView === 'edit' ? (
            <EditorHelp text={editorHelpText[channel]} />
        ) : (
            <DefaultOption {...channelData} channel={channel} />
        );
    }

    switch (channel) {
        case 'write': {
            return (
                <WriteOption
                    ingress={ingress}
                    {...sharedContactInformation.data.contactType.write}
                />
            );
        }
        case 'chat': {
            return (
                <ChatOption
                    ingress={ingress}
                    {...sharedContactInformation.data.contactType.chat}
                />
            );
        }
        case 'call': {
            return (
                <CallOption
                    ingress={ingress}
                    audience={audience}
                    {...sharedContactInformation.data.contactType.telephone}
                />
            );
        }
    }
};
