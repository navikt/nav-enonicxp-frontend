import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { RelatedSituations } from 'components/_common/relatedSituations/RelatedSituations';
import { ContentType } from 'types/content-props/_content-common';
import { PartComponent, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

export const RelatedSituationsPart: PartComponent<PartType.RelatedSituations> = ({ config }) => {
    const { type, data, _id } = usePageContentProps();

    if (type !== ContentType.ProductPage) {
        return <EditorHelp text={`Ugyldig content-type ${type}`} />;
    }

    // If the page is in preview mode, related situations from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the situations until the page has been refreshed.
    const isComponentPreviewMode = _id === '';
    if (isComponentPreviewMode) {
        return (
            <EditorHelp
                type={'info'}
                text={'Aktuelle situasjoner vises her når du klikker "marker som klar".'}
            />
        );
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
