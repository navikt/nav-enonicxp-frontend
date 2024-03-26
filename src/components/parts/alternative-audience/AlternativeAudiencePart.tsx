import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { ContentType } from 'types/content-props/_content-common';
import { PartComponent, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

export const AlternativeAudiencePart: PartComponent<PartType.AlternativeAudience> = ({
    config,
}) => {
    const { data, type, _id, displayName } = usePageContentProps();

    if (type !== ContentType.ProductPage) {
        return <EditorHelp text={`Ugyldig content-type ${type}`} />;
    }

    // If the page is in preview mode, audience from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the audience until the page has been refreshed.
    const isComponentPreviewMode = _id === '';
    if (isComponentPreviewMode) {
        return (
            <EditorHelp
                type={'info'}
                text={'Aktuelle målgrupper vises her når du klikker "marker som klar".'}
            />
        );
    }

    const { alternativeAudience, title } = data;
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

    return (
        <AlternativeAudience
            alternativeAudience={alternativeAudience}
            productName={title || displayName}
            showProductName={config.showProductName}
        />
    );
};
