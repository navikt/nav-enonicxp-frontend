import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { ContentType } from 'types/content-props/_content-common';
import { createTypeGuard } from 'types/_type-guards';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

const isValidContentType = createTypeGuard([
    ContentType.ProductPage,
    ContentType.ThemedArticlePage,
    ContentType.GuidePage,
] as const);

export type PartConfigAlternativeAudience = {
    showProductName: boolean;
};

export const AlternativeAudiencePart = ({
    config,
}: PartComponentProps<PartType.AlternativeAudience>) => {
    const { data, type, displayName } = usePageContentProps();

    if (!isValidContentType(type)) {
        return <EditorHelp text={`Ugyldig content-type ${type}`} />;
    }

    const { alternativeAudience } = data;
    if (!alternativeAudience) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Feil: Du har huket av for å vise aktuelle målgrupper i denne seksjonen, men ingen målgrupper er valgt i metadata til venstre.'
                }
            />
        );
    }

    return <AlternativeAudience />;
};
