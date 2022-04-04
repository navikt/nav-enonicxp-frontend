import React from 'react';

import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import { ContactOptionProps } from '../../../types/component-props/parts/contact-option';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;

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

    return <DefaultOption {...channelData} channel={channel} />;
};
