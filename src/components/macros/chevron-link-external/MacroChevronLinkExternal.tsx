import React from 'react';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { ChevronLinkExternalMacroProps } from '../../../types/macro-props/chevron-link-external';

export const MacroChevronLinkExternal = ({
    config,
}: ChevronLinkExternalMacroProps) => {
    if (!config?.chevron_link_external) {
        return null;
    }

    const { url, text } = config.chevron_link_external;

    return <LenkeStandalone href={url}>{text}</LenkeStandalone>;
};
