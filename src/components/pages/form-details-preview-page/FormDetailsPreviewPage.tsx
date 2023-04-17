import React from 'react';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { ContentCommonProps } from 'types/content-props/_content-common';
import { FormDetailsPageProps } from 'types/content-props/form-details';

import styles from './FormDetailsPreviewPage.module.scss';

export const FormDetailsPreviewPage = ({
    data,
}: FormDetailsPageProps & ContentCommonProps) => (
    <div className={styles.formDetailsPreviewPage}>
        <FormDetails formDetails={data} />
    </div>
);
