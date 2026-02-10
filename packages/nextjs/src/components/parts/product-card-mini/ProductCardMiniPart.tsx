import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { CardTargetProps, getCardProps } from 'components/_common/card/card-utils';
import { MiniCardV2 } from 'components/_common/card/MiniCardV2/MiniCardV2';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';

export type PartConfigProductCardMini = {
    header?: string;
    targetPage: CardTargetProps;
    ingressOverride?: string;
};

export const ProductCardMiniPart = ({ config }: PartComponentProps<PartType.ProductCardMini>) => {
    const pageConfig = usePageContentProps();

    if (!config?.targetPage) {
        return (
            <EditorHelp text={'Velg en produktside eller livssituasjon for å aktivere kortet'} />
        );
    }

    const { targetPage, ingressOverride } = config;

    const cardProps = getCardProps(targetPage, pageConfig, ingressOverride);

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
