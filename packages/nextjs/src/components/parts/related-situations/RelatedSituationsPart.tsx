import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { RelatedSituations } from 'components/_common/relatedSituations/RelatedSituations';
import { ContentType } from 'types/content-props/_content-common';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { createTypeGuard } from 'types/_type-guards';
import { ProductPageProps } from 'types/content-props/dynamic-page-props';

const isValidContentType = createTypeGuard([
    ContentType.ProductPage,
    ContentType.ThemedArticlePage,
    ContentType.GuidePage,
    ContentType.SituationPage,
] as const);

export type PartConfigRelatedSituations = {
    title: string;
    description: string;
};

export const RelatedSituationsPart = ({
    config,
}: PartComponentProps<PartType.RelatedSituations>) => {
    const { type, data } = usePageContentProps<ProductPageProps>();

    if (!isValidContentType(type)) {
        return <EditorHelp text={`Ugyldig content-type ${type}`} />;
    }

    const { relatedSituations } = data;
    if (!relatedSituations || relatedSituations.length === 0) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Feil: Du har huket av for å vise aktuelle situasjoner i denne seksjonen, men ingen situasjoner er valgt i metadata til venstre.'
                }
            />
        );
    }

    return (
        <RelatedSituations
            relatedSituations={relatedSituations}
            title={config.title}
            description={config.description}
        />
    );
};
