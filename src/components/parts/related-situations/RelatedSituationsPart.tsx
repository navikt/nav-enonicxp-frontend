import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { RelatedSituations } from 'components/_common/relatedSituations/RelatedSituations';
import { RelatedSituationsProps } from 'types/component-props/parts/related-situations';
import { ContentType } from 'types/content-props/_content-common';
import { createTypeGuard } from 'types/_type-guards';

const isValidContentType = createTypeGuard([
    ContentType.ProductPage,
    ContentType.ThemedArticlePage,
    ContentType.GuidePage,
] as const);

export const RelatedSituationsPart = ({ config, pageProps }: RelatedSituationsProps) => {
    const { type, data, _id } = pageProps;

    // If the page is in preview mode, related situations from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the situations until the page has been refreshed.
    const isComponentPreviewMode = _id === '';
    if (isComponentPreviewMode || type === ContentType.DynamicPage) {
        return (
            <EditorHelp
                type={'info'}
                text={'Aktuelle situasjoner vises her når du klikker "marker som klar".'}
            />
        );
    }

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
