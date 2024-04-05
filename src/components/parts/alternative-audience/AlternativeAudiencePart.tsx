import React from 'react';

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { AlternativeAudienceProps } from 'types/component-props/parts/alternative-audience';
import { ContentType } from 'types/content-props/_content-common';
import { createTypeGuard } from 'types/_type-guards';

const isValidContentType = createTypeGuard([
    ContentType.ProductPage,
    ContentType.ThemedArticlePage,
    ContentType.GuidePage,
] as const);

export const AlternativeAudiencePart = ({ config, pageProps }: AlternativeAudienceProps) => {
    const { data, type, _id, displayName } = pageProps;

    // If the page is in preview mode, audience from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the audience until the page has been refreshed.
    const isComponentPreviewMode = _id === '';
    // Note (02.04.24): The type guard for DynamicPage needs to be in place until ComponentPreview
    // receives the actual content type from the actual page props. Described in task:
    // https://github.com/navikt/nav-enonicxp/issues/2081
    if (isComponentPreviewMode || type === ContentType.DynamicPage) {
        return (
            <EditorHelp
                type={'info'}
                text={'Aktuelle målgrupper vises her når du klikker "marker som klar".'}
            />
        );
    }

    if (!isValidContentType(type)) {
        return <EditorHelp text={`Ugyldig content-type ${type}`} />;
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
