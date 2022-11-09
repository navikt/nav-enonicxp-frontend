import React from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './OverviewPageFilter.module.scss';

type FilterTypes = Area | Taxonomy;

type FilterType<Type extends FilterTypes> = Type extends Area
    ? 'areas'
    : Type extends Taxonomy
    ? 'taxonomies'
    : never;

type OverviewFilterProps<Type extends FilterTypes> = {
    type: FilterType<Type>;
    selectionCallback: (filter: Type) => void;
    selected: Type;
    options: Type[];
};

export const OverviewPageFilter = <Type extends FilterTypes>({
    type,
    selectionCallback,
    selected,
    options,
}: OverviewFilterProps<Type>) => {
    const { language } = usePageConfig();

    const translations = translator('overview', language)(type);
    const translationsOptions = translator(type, language) as (
        key: Type
    ) => string;

    return (
        <div className={styles.overviewFilter}>
            <Heading size={'small'} level={'2'}>
                {translations['choose']}
            </Heading>
            <nav
                role={'navigation'}
                aria-label={translations['ariaExplanation']}
            >
                <ul className={styles.filterWrapper}>
                    {options.map((filter) => {
                        const isActive = selected === filter;
                        const optionLabel = translationsOptions(filter);

                        return (
                            <li key={filter}>
                                <button
                                    type={'button'}
                                    onClick={() => selectionCallback(filter)}
                                    aria-current={isActive}
                                    aria-label={`${translations['ariaItemExplanation']} ${optionLabel}}`}
                                    className={classNames(
                                        styles.filterButton,
                                        isActive && styles.activeButton
                                    )}
                                >
                                    <Tag
                                        variant={'info'}
                                        className={styles.tag}
                                        size={'small'}
                                    >
                                        {` ${optionLabel}`}
                                    </Tag>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
