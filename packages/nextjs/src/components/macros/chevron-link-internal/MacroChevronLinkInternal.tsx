import React from 'react';
import { MacroChevronLinkInternalProps } from 'types/macro-props/chevron-link-internal';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';

export const MacroChevronLinkInternal = ({ config }: MacroChevronLinkInternalProps) => {
    if (!config?.chevron_link_internal) {
        return null;
    }

    const { target, text } = config.chevron_link_internal;

    return <LenkeStandalone href={target?._path}>{text || target?.displayName}</LenkeStandalone>;
};
