import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { CardTargetProps, getCardProps } from 'components/_common/card/card-utils';
import { MiniCardV2 } from 'components/_common/cardV2/MiniCardV2';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
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

    const { targetPage, header, ingressOverride } = config;

    const props = getCardProps(targetPage, pageConfig, ingressOverride);

    console.log('props: ', props);
    console.log('config: ', config);

    if (!props) {
        return <EditorHelp type={'error'} text={'Kortet mangler innhold'} />;
    }

    return <MiniCardV2 {...props} />;
};
