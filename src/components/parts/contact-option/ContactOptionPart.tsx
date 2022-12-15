import React from 'react';

import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import { ContactOptionProps } from '../../../types/component-props/parts/contact-option';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { WriteOption } from 'components/_common/contact-option/WriteOption';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ChatOption } from 'components/_common/contact-option/ChatOption';

const sharedContactChannels = ['call', 'write', 'chat'];
const editorHelpText = {
    call: 'Velg telefonnummer før denne kontaktkanalen kan vises.  Alternativt vises gammel hardkodet telefon-informasjon.',
    write: 'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.',
    chat: 'Velg en "chat"-side før denne kontaktkanalen kan vises. Alternativt vises gammel hardkodet chat-informasjon.',
};

const getContactOptionComponent = (channel: string) => {
    const options = {
        call: CallOption,
        write: WriteOption,
        chat: ChatOption,
    }[channel];

    return options || DefaultOption;
};

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (!channel) {
        return <EditorHelp text={'Velg kontaktkanal fra listen til høyre'} />;
    }

    const channelData = config.contactOptions[channel];
    const { sharedContactInformation, ingress, phoneNumber } = channelData;

    const getSharedContactInformation = (channel: string) => {
        return {
            call: sharedContactInformation.data.contactType.telephone,
            write: sharedContactInformation.data.contactType.write,
            chat: sharedContactInformation.data.contactType.chat,
        }[channel];
    };

    const isSharedContactChannel = sharedContactChannels.includes(channel);

    if (isSharedContactChannel) {
        if (!sharedContactInformation) {
            // For backwards compatibility, check for misc data and
            // try to render the old contact option instead.
            if (channel === 'call' && phoneNumber) {
                return <DefaultOption {...channelData} channel={channel} />;
            }

            if (editorView === 'edit') {
                return <EditorHelp text={editorHelpText[channel]} />;
            }

            return <DefaultOption {...channelData} channel={channel} />;
        }

        const OptionComponent = getContactOptionComponent(channel);
        const overrideIngress = ingress ? { ingress } : {};

        return (
            <OptionComponent
                {...getSharedContactInformation(channel)}
                _path={sharedContactInformation._path}
                {...overrideIngress}
            />
        );
    }

    return <DefaultOption {...channelData} channel={channel} />;
};
