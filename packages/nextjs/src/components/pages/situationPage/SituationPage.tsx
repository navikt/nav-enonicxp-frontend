import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';

import { PartType } from 'types/component-props/parts';
import styles from './SituationPage.module.scss';

type ComponentNode = {
    descriptor?: string;
    regions?: Record<string, { components?: ComponentNode[] }>;
};

const componentContainsContactOption = (component?: ComponentNode): boolean => {
    if (!component) return false;

    if (
        typeof component.descriptor === 'string' &&
        component.descriptor.includes(PartType.KontaktOssKanal)
    ) {
        return true;
    }

    return Object.values(component.regions ?? {}).some((region) =>
        (region?.components ?? []).some(componentContainsContactOption)
    );
};

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    const pageRegions = props.page.regions;
    const pageContentRegion = pageRegions?.pageContent;
    const pageContentComponents = pageContentRegion?.components ?? [];
    const hasPageContentComponents = pageContentComponents.length > 0;

    const lastComponent = hasPageContentComponents ? pageContentComponents.at(-1) : undefined;
    const shouldRenderLastOutside = componentContainsContactOption(lastComponent);

    const componentPropsInsideContent =
        hasPageContentComponents && shouldRenderLastOutside
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
                <ComponentMapper componentProps={componentPropsInsideContent} pageProps={props} />
            </div>
            {shouldRenderLastOutside && lastComponent && (
                <ComponentMapper componentProps={lastComponent} pageProps={props} />
            )}
        </article>
    );
};
