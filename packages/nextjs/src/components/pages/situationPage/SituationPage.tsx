import React from 'react';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';

import { PartType } from 'types/component-props/parts';
import styles from './SituationPage.module.scss';

type ComponentNode = {
    descriptor: string;
    regions?: Record<string, { components: ComponentNode[] }>;
};

const componentIsContactModule = (component: ComponentNode): boolean => {
    if (!component) return false;

    // Dersom komponenten inneholder en KontaktOssKanalPart er vi inni kontaktmodulen på siden, antar vi. Samme logikk brukes for å sjekke om en layout er en kontaktmodul i FlexColsLayout.module.scss ( &:has(:global(.part__contact-option)) )
    if (component.descriptor.includes(PartType.KontaktOssKanal)) {
        return true;
    }

    const regions = Object.values(component.regions ?? {});

    for (const region of regions) {
        if (region?.components?.some(componentIsContactModule)) {
            return true;
        }
    }

    return false;
};

// Kontaktmodulen skal ligge utenfor hovedkolonnen slik at den kan bryte gridet og strekke seg over hele bredden. Splitt ut siste komponent dersom den er kontaktmodul. Noen situasjonssider kan mangle kontaktmodulen (f.eks. https://www.nav.no/psykiske-helseproblemer)
const extractLastComponentIfContactModule = (page: SituationPageProps['page']) => {
    const components = page.regions?.pageContent?.components ?? [];
    const lastComponent = components.at(-1);
    const shouldRenderContactModuleOutside = lastComponent
        ? componentIsContactModule(lastComponent)
        : false;

    if (!shouldRenderContactModuleOutside) {
        return {
            componentPropsInsideContent: page,
            lastComponent: undefined,
            shouldRenderContactModuleOutside: false,
        } as const;
    }

    return {
        componentPropsInsideContent: {
            ...page,
            regions: {
                ...page.regions,
                pageContent: {
                    ...page.regions?.pageContent,
                    components: components.slice(0, -1),
                },
            },
        },
        lastComponent,
        shouldRenderContactModuleOutside: true,
    } as const;
};

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    const { componentPropsInsideContent, lastComponent, shouldRenderContactModuleOutside } =
        extractLastComponentIfContactModule(props.page);

    return (
        <article className={styles.situationPage}>
            <div className={classNames(styles.content, hasMultipleLanguages && styles.pullUp)}>
                <ComponentMapper componentProps={componentPropsInsideContent} pageProps={props} />
            </div>
            {shouldRenderContactModuleOutside && (
                <ComponentMapper componentProps={lastComponent} pageProps={props} />
            )}
        </article>
    );
};
