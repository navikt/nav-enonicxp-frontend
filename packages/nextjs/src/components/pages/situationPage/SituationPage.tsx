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

const componentIsContactModule = (component?: ComponentNode): boolean => {
    if (!component) return false;

    // Dersom komponenten inneholder en KontaktOssKanalPart er vi inni kontaktmodulen på siden, antar vi. Samme logikk brukes for å sjekke om en layout er en kontaktmodul i FlexColsLayout.module.scss ( &:has(:global(.part__contact-option)) )
    if (component.descriptor.includes(PartType.KontaktOssKanal)) {
        return true;
    }

    const regions = Object.values(component.regions ?? {});

    for (const region of regions) {
        // Kontaktmodulen kan ligge i en nested region – gå rekursivt innover og avbryt ved første treff
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

    if (!lastComponent || !componentIsContactModule(lastComponent)) {
        return {
            componentsWithoutContactModule: page,
            contactModuleComponent: undefined,
        } as const;
    }

    return {
        componentsWithoutContactModule: {
            ...page,
            regions: {
                ...page.regions,
                pageContent: {
                    ...page.regions?.pageContent,
                    components: components.slice(0, -1),
                },
            },
        },
        contactModuleComponent: lastComponent,
    } as const;
};

export const SituationPage = (props: SituationPageProps) => {
    const { languages } = usePageContentProps();
    const hasMultipleLanguages = languages && languages?.length > 0;

    // I editorvisning må alle komponenter rendres innenfor sin region for at XP-editoren
    // skal kunne finne parent-regionen. Uten dette fungerer ikke f.eks. "Fjern"-knappen.
    const { componentsWithoutContactModule, contactModuleComponent } =
        props.editorView === 'edit'
            ? { componentsWithoutContactModule: props.page, contactModuleComponent: undefined }
            : extractLastComponentIfContactModule(props.page);

    return (
        <article className={styles.situationPage}>
            <div className={classNames(styles.content, hasMultipleLanguages && styles.pullUp)}>
                <ComponentMapper
                    componentProps={componentsWithoutContactModule}
                    pageProps={props}
                />
            </div>
            {contactModuleComponent && (
                <ComponentMapper componentProps={contactModuleComponent} pageProps={props} />
            )}
        </article>
    );
};
