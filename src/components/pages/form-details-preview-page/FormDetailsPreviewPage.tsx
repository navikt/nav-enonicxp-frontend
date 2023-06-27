import React from 'react';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';

import styles from './FormDetailsPreviewPage.module.scss';

const displayConfig = {
    showTitle: true,
    showIngress: true,
    showAddendums: true,
    showApplications: true,
};

export const FormDetailsPreviewPage = (props: FormDetailsPageProps) => {
    const { data } = props;

    return (
        <div className={styles.formDetailsPreviewPage}>
            <FormDetails formDetails={data} displayConfig={displayConfig} />
        </div>
    );
};
