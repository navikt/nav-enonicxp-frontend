import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';

import styles from './SituationPage.module.scss';

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    const pageRegions = props.page.regions;
    const pageContentRegion = pageRegions?.pageContent;
    const pageContentComponents = pageContentRegion?.components ?? [];
    const hasTailComponent = pageContentComponents.length > 0;

    const lastComponent = hasTailComponent
        ? pageContentComponents[pageContentComponents.length - 1]
        : undefined;

    const componentPropsWithoutLast =
        hasTailComponent && pageRegions && pageContentRegion
            ? {
                  ...props.page,
                  regions: {
                      ...pageRegions,
                      pageContent: {
                          ...pageContentRegion,
                          components: pageContentComponents.slice(0, -1),
                      },
                  },
              }
            : props.page;

    return (
        <article className={styles.situationPage}>
            <div className={classNames(styles.content, hasMultipleLanguages && styles.pullUp)}>
                <ComponentMapper componentProps={componentPropsWithoutLast} pageProps={props} />
            </div>
            {lastComponent && <ComponentMapper componentProps={lastComponent} pageProps={props} />}
        </article>
    );
};
