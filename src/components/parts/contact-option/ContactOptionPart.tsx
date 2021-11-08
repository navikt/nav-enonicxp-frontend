import React from 'react';

import { ContactOption } from 'components/_common/contact-option/DefaultOption';
import { ContactOptionProps } from '../../../types/component-props/parts/contact-option';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const channel = config?.contactOptions?._selected;

    if (!channel) {
        return <EditorHelp text={'Velg kanal fra listen til høyre'} />;
    }

    const channelData = config.contactOptions[channel];

    return <ContactOption {...channelData} channel={channel} />;
};
