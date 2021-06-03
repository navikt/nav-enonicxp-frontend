import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { ContactOptionProps } from '../../../../types/component-props/parts/contact-option';

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    if (!config?.contactOptions?._selected) {
        return null;
    }

    const { contactOptions } = config;

    const selectedChannel = contactOptions._selected;
    const channelData = contactOptions[selectedChannel];

    return (
        <div>
            <Undertittel>{`Valgt kanal: ${selectedChannel}`}</Undertittel>
            {channelData.ingress &&
                `Overstyrer ingress: ${channelData.ingress}`}
        </div>
    );
};
