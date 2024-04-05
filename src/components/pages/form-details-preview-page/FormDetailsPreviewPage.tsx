import React from 'react';

import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

import styles from './FormDetailsPreviewPage.module.scss';

const displayConfig = {
    showTitle: true,
    showIngress: true,
    showAddendums: true,
    showApplications: true,
};

export const FormDetailsPreviewPage = (props: FormDetailsPageProps) => {
    const { data, editorView } = props;

    if (!editorView) {
        return <RedirectTo404 />;
    }

    return (
        <div className={styles.formDetailsPreviewPage}>
            <FormDetails formDetails={data} displayConfig={displayConfig} />
        </div>
    );
};
