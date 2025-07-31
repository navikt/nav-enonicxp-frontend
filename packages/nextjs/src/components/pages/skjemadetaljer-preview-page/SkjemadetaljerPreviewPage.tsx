import React from 'react';
import { Skjemadetaljer } from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { FormDetailsPageProps } from 'types/content-props/skjemadetaljer';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

import styles from './SkjemadetaljerPreviewPage.module.scss';

const displayConfig = {
    showTitle: true,
    showIngress: true,
    showAddendums: true,
    showApplications: true,
};

export const SkjemadetaljerPreviewPage = (props: FormDetailsPageProps) => {
    const { data, editorView, noRedirect } = props;

    if (!editorView && !noRedirect) {
        return <RedirectTo404 />;
    }

    return (
        <div className={styles.formDetailsPreviewPage}>
            <Skjemadetaljer formDetails={data} displayConfig={displayConfig} />
        </div>
    );
};
