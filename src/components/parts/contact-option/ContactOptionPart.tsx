import React from 'react';

import {
    ChannelType,
    SharedContactInformationData,
} from '../../../types/component-props/parts/contact-option';

import { DefaultOption } from 'components/_common/contact-option/DefaultOption';
import { CallOption } from 'components/_common/contact-option/CallOption';
import { ContactOptionProps } from '../../../types/component-props/parts/contact-option';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;

    if (!channel) {
        return <EditorHelp text={'Velg kanal fra listen til høyre'} />;
    }

    const channelData = config.contactOptions[channel];

    if (channel === ChannelType.CALL && Object.keys(channelData).length === 0) {
        return (
            <EditorHelp
                text={'Velg telefonnummer før denne kontaktkanalen kan vises.'}
            />
        );
    }

    if (channel === ChannelType.CALL) {
        const { sharedContactInformation } =
            channelData as SharedContactInformationData;

        // For backwards compatibility, show default call information
        // if no sharedContactInformation has been selected.
        if (!sharedContactInformation) {
            return <DefaultOption {...channelData} channel={channel} />;
        }

        console.log(sharedContactInformation)

        return (
            <CallOption
                {...sharedContactInformation.data.contactType.telephone}
                _path={sharedContactInformation._path}
                ingress={channelData.ingress}
            />
        );
    }

    return <DefaultOption {...channelData} channel={channel} />;
};
