import React from 'react';

import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import { ContactOptionProps } from '../../../types/component-props/parts/contact-option';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { WriteOption } from 'components/_common/contact-option/WriteOption';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (!channel) {
        return <EditorHelp text={'Velg kanal fra listen til høyre'} />;
    }

    const channelData = config.contactOptions[channel];

    if (channel === 'call') {
        const { sharedContactInformation, ingress, phoneNumber } = channelData;

        if (!sharedContactInformation) {
            // For backwards compatibility, show default call information
            // if no sharedContactInformation has been selected but a legacy
            // phoneNumber field exists.
            if (phoneNumber) {
                return <DefaultOption {...channelData} channel={channel} />;
            }

            return (
                <EditorHelp
                    text={
                        'Velg telefonnummer før denne kontaktkanalen kan vises.'
                    }
                />
            );
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
        const { sharedContactInformation, ingress, title, url } = channelData;

        if (!sharedContactInformation) {
            // If title was set, it means this part was added previous to the shared
            // WriteOption, so we need to just legacy handle this until the editors
            // get around to update the page in question.
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

    return <DefaultOption {...channelData} channel={channel} />;
};
