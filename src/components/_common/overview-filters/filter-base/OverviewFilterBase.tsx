import React from 'react';
import classNames from 'classnames';
import { Chips, Heading, Tag } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

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
    const { language } = usePageConfig();

    const translations = translator('overview', language)(type);
    const optionsTranslations = translator(type, language) as (
        key: Type
    ) => string;

    return (
        <div className={styles.overviewFilter}>
            <Heading size={'small'} level={'2'}>
                {translations['choose']}
            </Heading>
            <nav aria-label={translations['ariaExplanation']}>
                <Chips className={styles.filterWrapper}>
                    {options.map((option) => {
                        const isActive = selected === option;
                        const optionLabel = optionsTranslations(option);

                        return (
                            <Chips.Toggle
                                type={'button'}
                                onClick={() => selectionCallback(option)}
                                aria-label={`${translations['ariaItemExplanation']} ${optionLabel}`}
                                className={styles.filterButton}
                                selected={isActive}
                                key={option}
                            >
                                {optionLabel}
                            </Chips.Toggle>
                        );
                    })}
                </Chips>
            </nav>
        </div>
    );
};
