import React from 'react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { MacroLinkToLayerProps } from 'types/macro-props/link-to-layer';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

export const MacroLinkToLayer = ({ config }: MacroLinkToLayerProps) => {
    if (!config?.link_to_layer) {
        return <EditorHelp text={'Macroen mangler konfigurasjon'} type={'error'} />;
    }

    const { href, newTab, tooltip, body } = config.link_to_layer;

    return (
        <LenkeInline href={href} title={tooltip} target={newTab ? '_blank' : undefined}>
            {body}
        </LenkeInline>
    );
};
