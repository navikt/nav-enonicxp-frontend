import Tekstomrade from 'nav-frontend-tekstomrade';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { BEM, classNames } from 'utils/classnames';

import {
    ChannelData,
    ContactOption,
    ContactOptionProps,
} from '../../../../types/component-props/parts/contact-option';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import { usePageConfig } from '../../../../store/hooks/usePageConfig';
import { translator } from 'translations';

import './ContactOptionPart.less';

const bem = BEM('contactOption');

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const { language } = usePageConfig();
    const getLabels = translator('contactPoint', language);

    if (!config?.contactOptions?._selected) {
        return 'Velg kanal fra listen til høyre.';
    }

    const { contactOptions } = config;
    const selectedChannel = contactOptions._selected;
    const channelData = contactOptions[selectedChannel];

    const getTitle = (channel: ContactOption, data: ChannelData) => {
        if (channel === ContactOption.CALL && data.phoneNumber) {
            return data.phoneNumber;
        }
        const labels = getLabels(channel);
        return labels && labels.title;
    };

    const getIngress = (channel: ContactOption, data: ChannelData) => {
        const labels = getLabels(channel);
        return data.ingress || (labels && labels.ingress);
    };

    return (
        <div className={classNames(bem('wrapper'))}>
            <div
                className={classNames(
                    bem('icon'),
                    bem('icon', selectedChannel)
                )}
            />
            <LenkeBase
                href="http://www.nav.no"
                className={classNames(bem('link'))}
            >
                <Undertittel tag="h3" className={classNames(bem('title'))}>
                    {getTitle(selectedChannel, channelData)}
                </Undertittel>
            </LenkeBase>
            <Tekstomrade>
                {getIngress(selectedChannel, channelData)}
            </Tekstomrade>
        </div>
    );
};
