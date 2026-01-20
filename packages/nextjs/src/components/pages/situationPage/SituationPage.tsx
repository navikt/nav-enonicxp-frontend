import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';

import { PartType } from 'types/component-props/parts';
import styles from './SituationPage.module.scss';

type ComponentNode = {
    descriptor: string;
    regions?: Record<string, { components?: ComponentNode[] }>;
};

const komponentErKontaktModul = (component?: ComponentNode): boolean => {
    if (!component) return false;

    if (component.descriptor.includes(PartType.KontaktOssKanal)) {
        return true;
    }

    return Object.values(component.regions ?? {}).some((region) =>
        (region?.components ?? []).some(komponentErKontaktModul)
    );
};

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    const pageContentComponents = props.page.regions?.pageContent?.components ?? [];

    const lastComponent =
        pageContentComponents.length > 0 ? pageContentComponents.at(-1) : undefined;
    const shouldRenderLastOutside = komponentErKontaktModul(lastComponent);

    let componentPropsInsideContent = props.page;

    if (shouldRenderLastOutside) {
        const componentsWithoutContactModule = pageContentComponents.slice(0, -1);

        componentPropsInsideContent = {
            ...props.page,
            regions: {
                ...props.page.regions,
                pageContent: {
                    ...props.page.regions?.pageContent,
                    components: componentsWithoutContactModule,
                },
            },
        };
    }

    return (
        <article className={styles.situationPage}>
            <div className={classNames(styles.content, hasMultipleLanguages && styles.pullUp)}>
                <ComponentMapper componentProps={componentPropsInsideContent} pageProps={props} />
            </div>
            {shouldRenderLastOutside && (
                <ComponentMapper componentProps={lastComponent} pageProps={props} />
            )}
        </article>
    );
};
