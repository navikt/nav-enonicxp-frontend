import React from 'react';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';

import styles from './FormDetailsPreviewPage.module.scss';
import ErrorPage404 from 'pages/404';

const displayConfig = {
    showTitle: true,
    showIngress: true,
    showAddendums: true,
    showApplications: true,
};

export const FormDetailsPreviewPage = (props: FormDetailsPageProps) => {
    const { data, editorView } = props;
    if (!editorView) {
        return <ErrorPage404 />;
    }
    return (
        <div className={styles.formDetailsPreviewPage}>
            <FormDetails formDetails={data} displayConfig={displayConfig} />
        </div>
    );
};
