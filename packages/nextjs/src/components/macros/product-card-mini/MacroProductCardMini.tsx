import React from 'react';
import { MacroProductCardMiniProps } from 'types/macro-props/product-card-mini';
import { MiniCardV2 } from 'components/_common/card/MiniCardV2/MiniCardV2';
import { getCardProps } from 'components/_common/card/card-utils';
import { usePageContentProps } from 'store/pageContext';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

export const MacroProductCardMini = ({ config }: MacroProductCardMiniProps) => {
    const pageContext = usePageContentProps();

    if (!config?.product_card_mini) {
        return <EditorHelp text={'Macroen mangler konfigurasjon'} />;
    }

    const { targetPage } = config.product_card_mini;

    const cardProps = getCardProps(targetPage, pageContext);

    if (!cardProps) {
        return <EditorHelp type={'error'} text={'Kortet mangler innhold'} />;
    }

    const { link, type, tagline, language, taglineLanguage } = cardProps;

    return (
        <MiniCardV2
            link={link}
            type={type}
            tagline={tagline}
            language={language}
            taglineLanguage={taglineLanguage}
        />
    );
};
