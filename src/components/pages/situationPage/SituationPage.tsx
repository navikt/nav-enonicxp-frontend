import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';

import styles from './SituationPage.module.scss';

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    return (
        <article className={styles.situationPage}>
            <div className={classNames(styles.content, hasMultipleLanguages && styles.pullUp)}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
        </article>
    );
};
