import React from 'react';
import { Skjemadetaljer } from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { SkjemadetaljerPageProps } from 'types/content-props/skjemadetaljer';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import styles from './SkjemadetaljerPreviewPage.module.scss';

const displayConfig = {
    showTitle: true,
    showIngress: true,
    showAddendums: true,
    showApplications: true,
};

const errorTexts = {
    addendum:
        'Det er valgt skjemadetaljer av typen «Ettersendelse», men det mangler knappetekst og lenke til skjema. Legg inn knappetekst og skjemalenke, eller velg slett',
    complaint:
        'Det er valgt skjemadetaljer av typen «Klage», men det mangler knappetekst og lenke til skjema. Legg inn knappetekst og skjemalenke, eller velg slett.',
};

const createEditorialErrors = (data: SkjemadetaljerPageProps['data']) => {
    const errors: string[] = [];
    if (
        data.formType.some(
            (type) => type._selected === 'addendum' && type.addendum?.variations.length === 0
        )
    ) {
        errors.push(errorTexts.addendum);
    }

    if (
        data.formType.some(
            (type) => type._selected === 'complaint' && type.complaint?.variations.length === 0
        )
    ) {
        errors.push(errorTexts.complaint);
    }
    return errors;
};

export const SkjemadetaljerPreviewPage = (props: SkjemadetaljerPageProps) => {
    const { data, editorView, noRedirect } = props;

    if (!editorView && !noRedirect) {
        return <RedirectTo404 />;
    }

    const editorialErrors = createEditorialErrors(data);

    return (
        <div className={styles.skjemadetaljerPreviewPage}>
            {editorialErrors.map((error) => (
                <EditorHelp key={error} text={error} type="error" />
            ))}
            <Skjemadetaljer skjemadetaljer={data} displayConfig={displayConfig} />
        </div>
    );
};
