import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlWarning } from './warnings/kort-url/KortUrlWarning';
import { DuplicateIds } from './warnings/duplicate-ids/DuplicateIds';
import { FormNumbersWarning } from './warnings/form-numbers/FormNumbersWarning';
import { KontaktinformasjonWarning } from './warnings/kontaktinformasjon/KontaktinformasjonWarning';
import { PartUtenforInnholdsseksjon } from './warnings/part-utenfor-innholdsseksjon/PartUtenforInnholdsseksjon';

const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

export const RenderToEditorGlobalWarnings = ({ children }: { children: React.ReactNode }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    if (isFirstRender) {
        return null;
    }

    const element = document.getElementById(EDITOR_GLOBAL_WARNINGS_CONTAINER_ID);
    if (!element) {
        return null;
    }

    return createPortal(children, element);
};

export const EditorGlobalWarnings = ({ content }: { content: ContentProps }) => {
    const godkjenteSider = [
        'no.nav.navno:situation-page',
        'no.nav.navno:current-topic-page',
        'no.nav.navno:guide-page',
        'no.nav.navno:themed-article-page',
        'no.nav.navno:content-page-with-sidemenus',
        'no.nav.navno:tools-page',
        'no.nav.navno:generic-page',
    ];

    if (!godkjenteSider.includes(content.type)) {
        return;
    }
    const hasErrors = (): boolean => {
        return (
            KortUrlWarning({ content }) !== null ||
            DuplicateIds() !== null ||
            FormNumbersWarning({ content }) !== null ||
            KontaktinformasjonWarning({ content }) !== null ||
            PartUtenforInnholdsseksjon({ content }) !== null
        );
    };

    return (
        <>
            {hasErrors() && (
                <Alert variant="warning">
                    <strong>Redaktørvarsel:</strong>
                    <br />
                    Disse problemene må rettes før publisering:
                    <ul>
                        <KortUrlWarning content={content} />
                        <DuplicateIds />
                        <FormNumbersWarning content={content} />
                        <KontaktinformasjonWarning content={content} />
                        <PartUtenforInnholdsseksjon content={content} />
                    </ul>
                </Alert>
            )}
        </>
    );
};
