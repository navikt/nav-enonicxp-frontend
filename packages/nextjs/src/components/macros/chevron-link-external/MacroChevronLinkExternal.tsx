import React from 'react';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { MacroChevronLinkExternalProps } from 'types/macro-props/chevron-link-external';

export const MacroChevronLinkExternal = ({ config }: MacroChevronLinkExternalProps) => {
    if (!config?.chevron_link_external) {
        return null;
    }

    const { url, text } = config.chevron_link_external;

    return <LenkeStandalone href={url} withChevron>{text}</LenkeStandalone>;
};
