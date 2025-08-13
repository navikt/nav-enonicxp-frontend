import React from 'react';
import { Chips, Heading } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import styles from './OversiktFilterBase.module.scss';

type FilterType<Type extends Area> = Type extends Area ? 'areas' : never;

type Props<Type extends Area> = {
    type: FilterType<Type>;
    selectionCallback: (filter: Type) => void;
    selected: Type;
    options: Type[];
    hideLabel?: boolean;
};

export const OversiktFilterBase = <Type extends Area>({
    type,
    selectionCallback,
    selected,
    options,
    hideLabel = false,
}: Props<Type>) => {
    const { language } = usePageContentProps();
    const translations = translator('oversikt', language)(type);
    const optionsTranslations = translator(type, language) as (key: Type) => string;

    return (
        <section className={styles.oversiktFilter}>
            {!hideLabel && (
                <Heading size="xsmall" level="3">
                    {translations['choose']}
                </Heading>
            )}
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
