/* eslint-disable react-hooks/rules-of-hooks */

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import {
    DetailType,
    OfficeEditorialDetailProps,
} from 'types/component-props/parts/office-editorial-detail';
import { PlaceholderIndicator } from './PlaceholderIndicator';

export const OfficeEditorialDetail = ({
    config,
}: OfficeEditorialDetailProps) => {
    const { detailType } = config;
    const { pageConfig } = usePageConfig();

    // Note these texts are presented to editors only to give an idea
    // of what information the placeholder represent.
    const editorTranslation: { [key in DetailType]: string } = {
        [DetailType.SERVICE_INFORMATION]:
            'informasjon om tjenestene til kontoret.',
        [DetailType.SOCIAL_HELP_LINK]: 'lenke til søknad om sosialhjelp.',
        [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]:
            'informasjon om utbetaling av sosialhjelp',
        [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]:
            'informasjon om postkasse/henting av søknad for sosialhjelp.',
    };

    if (pageConfig.editorView) {
        if (!detailType) {
            <EditorHelp text="Angi hvilken informasjon fra kontoret som skal vises her ved å velge fra innstillingene til høyre." />;
        }
        return (
            <PlaceholderIndicator>{`Her plasseres kontor-spesifikk ${editorTranslation[detailType]}`}</PlaceholderIndicator>
        );
    }

    return null;
};
