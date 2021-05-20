import React from 'react';
import { ChevronLinkInternalMacroProps } from '../../../types/macro-props/chevron-link-internal';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';

export const MacroChevronLinkInternal = ({
    config,
}: ChevronLinkInternalMacroProps) => {
    if (!config?.chevron_link_internal) {
        return null;
    }

    const { target, text } = config.chevron_link_internal;

    return (
        <LenkeStandalone href={target?._path}>
            {text || target?.displayName}
        </LenkeStandalone>
    );
};
