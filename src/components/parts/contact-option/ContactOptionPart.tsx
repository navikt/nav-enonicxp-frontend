import React from 'react';
import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import { ContactOptionProps } from 'types/component-props/parts/contact-option';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { WriteOption } from 'components/_common/contact-option/WriteOption';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ChatOption } from 'components/_common/contact-option/ChatOption';

const editorHelpText = {
    call: 'Velg telefonnummer før denne kontaktkanalen kan vises.  Alternativt vises gammel hardkodet telefon-informasjon.',
    write: 'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.',
    chat: 'Velg en "chat"-side før denne kontaktkanalen kan vises. Alternativt vises standard chat-tekstinnhold.',
};

export const ContactOptionPart = ({
    config,
    pageProps,
}: ContactOptionProps) => {
    const { pageConfig } = usePageConfig();

    const channel = config?.contactOptions?._selected;
    if (!channel) {
        return <EditorHelp text={'Velg kontaktkanal fra listen til høyre'} />;
    }

    const isEditView = pageConfig.editorView === 'edit';

    const { audience } = pageProps.data;

    const channelData = config.contactOptions[channel];

    const { sharedContactInformation, ingress } = channelData;

    if (channel === 'write') {
        if (!sharedContactInformation) {
            return !isEditView ? (
                <DefaultOption {...channelData} channel={'write'} />
            ) : (
                <EditorHelp text={editorHelpText.write} />
            );
        }

        return (
            <WriteOption
                ingress={ingress}
                {...sharedContactInformation.data.contactType.write}
            />
        );
    }

    if (channel === 'call') {
        if (!sharedContactInformation) {
            return config.contactOptions.call.phoneNumber && !isEditView ? (
                <DefaultOption {...channelData} channel={'call'} />
            ) : (
                <EditorHelp text={editorHelpText.call} />
            );
        }

        return (
            <CallOption
                ingress={ingress}
                audience={audience}
                {...sharedContactInformation.data.contactType.telephone}
            />
        );
    }

    if (channel === 'chat') {
        if (!sharedContactInformation) {
            return !isEditView ? (
                <DefaultOption {...channelData} channel={'write'} />
            ) : (
                <EditorHelp text={editorHelpText.chat} />
            );
        }

        return (
            <ChatOption
                ingress={ingress}
                {...sharedContactInformation.data.contactType.chat}
            />
        );
    }

    return <DefaultOption ingress={ingress} channel={channel} />;
};
