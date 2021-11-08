import React from 'react';

import { ChannelType } from '../../../types/component-props/parts/contact-option';

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

    if (channel === ChannelType.CALL) {
        return <CallOption {...channelData} channel={channel} />;
    }

    return <DefaultOption {...channelData} channel={channel} />;
};
