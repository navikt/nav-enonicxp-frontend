import React from 'react';
import { Chips, Heading } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import styles from './OverviewFilterBase.module.scss';

type FilterOptions = Area | Taxonomy;

type FilterType<Type extends FilterOptions> = Type extends Area
    ? 'areas'
    : Type extends Taxonomy
      ? 'taxonomies'
      : never;

type Props<Type extends FilterOptions> = {
    type: FilterType<Type>;
    selectionCallback: (filter: Type) => void;
    selected: Type;
    options: Type[];
};

export const OverviewFilterBase = <Type extends FilterOptions>({
    type,
    selectionCallback,
    selected,
    options,
}: Props<Type>) => {
    const { language } = usePageContentProps();
    const translations = translator('overview', language)(type);
    const optionsTranslations = translator(type, language) as (key: Type) => string;

    return (
        <section className={styles.overviewFilter}>
            <Heading size={'xsmall'} level={'3'}>
                {translations['select']}
            </Heading>
            <Chips className={styles.filterWrapper}>
                {options.map((option) => {
                    const optionLabel = optionsTranslations(option);

                    return (
                        <Chips.Toggle
                            type={'button'}
                            onClick={() => selectionCallback(option)}
                            aria-label={`${translations['ariaItemExplanation']} ${optionLabel}`}
                            className={styles.filterButton}
                            checkmark={false}
                            selected={selected === option}
                            key={option}
                        >
                            {optionLabel}
                        </Chips.Toggle>
                    );
                })}
            </Chips>
        </section>
    );
};
