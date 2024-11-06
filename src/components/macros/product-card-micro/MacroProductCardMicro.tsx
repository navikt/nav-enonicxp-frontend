import React from 'react';
import { MacroProductCardMicroProps } from 'types/macro-props/product-card-micro';
import { MicroCards } from 'components/_common/card/MicroCard/MicroCards';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const MacroProductCardMicro = ({ config }: MacroProductCardMicroProps) => {
    if (!config?.product_card_micro) {
        return <EditorHelp text={'Macroen mangler konfigurasjon'} />;
    }

    const { card_list, header } = config.product_card_micro;

    return <MicroCards card_list={card_list} header={header} />;
};
