import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ProductPageData } from 'types/content-props/dynamic-page-props';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { AlternativeAudienceProps } from 'types/component-props/parts/alternative-audience';

export const AlternativeAudiencePart = ({
    config,
    pageProps,
}: AlternativeAudienceProps) => {
    const alternativeAudience = (pageProps.data as ProductPageData)
        ?.alternativeAudience;

    // If the page is in preview mode, audience from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the audience until the page has been refreshed.
    const isComponentPreviewMode = pageProps._id === '';

    if (isComponentPreviewMode) {
        return (
            <EditorHelp
                type={'info'}
                text={
                    'Aktuelle målgrupper vises her når du klikker "marker som klar".'
                }
            />
        );
    }

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
            productName={pageProps.data?.title || pageProps.displayName}
            showProductName={config?.showProductName}
        />
    );
};
