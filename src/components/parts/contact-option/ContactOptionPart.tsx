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
    call: 'Velg telefonnummer før denne kontaktkanalen kan vises.',
    write: 'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.',
    chat: 'Velg en "chat"-side før denne kontaktkanalen kan vises.',
};

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (!channel) {
        return <EditorHelp text={'Velg kontaktkanal fra listen til høyre'} />;
    }

    const channelData = config.contactOptions[channel];
    const { sharedContactInformation, ingress, title, url, phoneNumber } =
        channelData;

    const isSharedContactChannel = sharedContactChannels.includes(channel);

    if (isSharedContactChannel) {
        if (!sharedContactInformation) {
            // For backwards compatibility, show default call information
            // if no sharedContactInformation has been selected but a legacy
            // phoneNumber field exists.

            if (phoneNumber) {
                return <DefaultOption {...channelData} channel={channel} />;
            }

            return <EditorHelp text={editorHelpText[channel]} />;
        }

        return (
            <CallOption
                {...sharedContactInformation.data.contactType.telephone}
                _path={sharedContactInformation._path}
                ingress={ingress}
            />
        );
    }

    if (channel === 'write') {
        if (!sharedContactInformation) {
            // If no sharedContactInformation is set, this might mean that the part was
            // added before the new 'write to us', so use the DefaultOption
            // which will pull legacy text from translation library.
            if (editorView !== 'edit') {
                return (
                    <DefaultOption
                        ingress={ingress}
                        title={title}
                        url={url}
                        channel={channel}
                    />
                );
            }

            return (
                <EditorHelp
                    text={
                        'Velg en "skriv til oss"-side før denne kontaktkanalen kan vises.'
                    }
                />
            );
        }

        const overrideIngress = ingress ? { ingress } : null;

        return (
            <WriteOption
                {...sharedContactInformation.data.contactType.write}
                {...overrideIngress}
                _path={sharedContactInformation._path}
            />
        );
    }

    if (channel === 'chat') {
        if (!sharedContactInformation) {
            // If no sharedContactInformation is set, this might mean that the part was
            // added before the new 'write to us', so use the DefaultOption
            // which will pull legacy text from translation library.
            if (editorView !== 'edit') {
                return (
                    <DefaultOption
                        ingress={ingress}
                        title={title}
                        url={url}
                        channel={channel}
                    />
                );
            }

            return (
                <EditorHelp
                    text={
                        'Velg en "chat med oss"-side før denne kontaktkanalen kan vises.'
                    }
                />
            );
        }

        const overrideIngress = ingress ? { ingress } : null;

        return (
            <ChatOption
                {...sharedContactInformation.data.contactType.chat}
                {...overrideIngress}
                _path={sharedContactInformation._path}
            />
        );
    }

    return <DefaultOption {...channelData} channel={channel} />;
};
